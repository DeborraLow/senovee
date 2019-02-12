const SP = '　';

const flatMap = (array, f) => array.reduce((a, e) => a.concat(f(e)), []);

const tagMapper = (pattern, handler) => (src) => {
  if (typeof src === 'string') {
    const part = [];
    const regex = new RegExp(pattern, 'g');
    let lastIndex = 0;
    let m;
    do {
      m = regex.exec(src);
      if (m) {
        if (lastIndex < m.index) {
          part.push(src.slice(lastIndex, m.index));
        }
        part.push(handler(m));
        lastIndex = m.index + m[0].length;
      } else if (lastIndex !== src.length) {
        part.push(src.slice(lastIndex, src.length));
      }
    } while (m);

    return part;
  }
  return src;
};

const parseTags = (body) => {
  let bodyNodes = [body];
  const chars = '[^|｜《》]+';
  const rubyPattern = `[|｜](${chars})《(${chars})》`;
  const markPattern = `《《(${chars})》》`;

  bodyNodes = flatMap(
    bodyNodes,
    tagMapper(rubyPattern, ([, target, ruby]) => ({
      tag: 'ruby',
      target,
      ruby,
    }))
  );
  bodyNodes = flatMap(
    bodyNodes,
    tagMapper(markPattern, ([, target]) => ({
      tag: 'mark',
      target,
    }))
  );

  return bodyNodes;
};

const parseLine = (line) => {
  const trimmed = line.trim();
  let parseObject;

  if (trimmed.length === 0) {
    parseObject = {
      type: 'br',
      body: [''],
    };
  } else if (line[0] === '（' && trimmed[trimmed.length - 1] === '）') {
    parseObject = {
      type: 'parenthesis',
      body: parseTags(line.slice(1, trimmed.length - 1)),
    };
  } else if (line[0] === '「' && trimmed[trimmed.length - 1] === '」') {
    parseObject = {
      type: 'brackets',
      body: parseTags(line.slice(1, trimmed.length - 1)),
    };
  } else if (line[0] === SP) {
    parseObject = {
      type: 'text',
      body: parseTags(trimmed),
    };
  } else if (line.slice(0, 2) === '//') {
    parseObject = {
      type: 'comment',
      body: parseTags(trimmed.slice(2).trim()),
    };
  } else if (line.match(/^([a-zA-Z])(.*)/)) {
    const [, symbol, rest] = line.match(/^([a-zA-Z])(.*)$/);
    const restParsed = parseLine(rest);
    if (['text', 'parenthesis', 'brackets'].indexOf(restParsed.type) >= 0) {
      parseObject = {
        ...restParsed,
        symbol,
      };
    } else {
      parseObject = {
        type: 'unknown',
        body: parseTags(trimmed),
      };
    }
  } else {
    parseObject = {
      type: 'unknown',
      body: parseTags(trimmed),
    };
  }
  return parseObject;
};

const parse = (str) => {
  const lines = str.split('\n');
  const parsedLines = lines.map(parseLine);

  return parsedLines;
};

const buildTags = (bodyNodes) =>
  bodyNodes
    .map((node) => {
      let s;
      if (typeof node === 'string') {
        s = node;
      }
      if (node.tag === 'ruby') {
        s = `｜${node.target}《${node.ruby}》`;
      }
      if (node.tag === 'mark') {
        s = `｜${node.target}《${'・'.repeat(node.target.length)}》`;
      }
      return s;
    })
    .join('');

const buildLine = ({ body, type }) => {
  switch (type) {
    case 'text':
      return [SP, ...body];
    case 'parenthesis':
      return ['（', ...body, '）'];
    case 'brackets':
      return ['「', ...body, '」'];
    case 'br':
    case 'unknown':
      return body;
    case 'comment':
      return null;
    default:
      throw new Error(`unknown type ${type}`);
  }
};

const flattenAst = (ast) => {
  const lines = ast.map(buildLine).filter((lineAst) => !!lineAst);
  return flatMap(lines, (line) => [...line, '\n']).slice(0, -1);
};

const build = (ast) => buildTags(flattenAst(ast));

const compile = (str) => {
  const ast = parse(str);
  return build(ast);
};

module.exports = {
  parse,
  parseLine,
  parseTags,
  build,
  buildLine,
  buildTags,
  compile,
};
