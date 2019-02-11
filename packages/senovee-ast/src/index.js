const SP = '　';

const parseLine = (line) => {
  const trimed = line.trim();
  let parseObject;

  if (trimed.length === 0) {
    parseObject = {
      type: 'br',
      body: '',
    };
  } else if (line[0] === '（' && trimed[trimed.length - 1] === '）') {
    parseObject = {
      type: 'parenthesis',
      body: line.slice(1, trimed.length - 1),
    };
  } else if (line[0] === '「' && trimed[trimed.length - 1] === '」') {
    parseObject = {
      type: 'brackets',
      body: line.slice(1, trimed.length - 1),
    };
  } else if (line[0] === SP) {
    parseObject = {
      type: 'text',
      body: trimed,
    };
  } else if (line.slice(0, 2) === '//') {
    parseObject = {
      type: 'comment',
      body: trimed.slice(2).trim(),
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
        body: trimed,
      };
    }
  } else {
    parseObject = {
      type: 'unknown',
      body: trimed,
    };
  }
  return parseObject;
};

const parse = (str) => {
  const lines = str.split('\n');
  const parsedLines = lines.map(parseLine);

  return parsedLines;
};

const buildLine = (obj) => {
  switch (obj.type) {
    case 'text':
      return `${SP}${obj.body}`;
    case 'parenthesis':
      return `（${obj.body}）`;
    case 'brackets':
      return `「${obj.body}」`;
    case 'br':
      return obj.body; // === ''
    case 'comment':
      return null;
    case 'unknown':
      return obj.body;
    default:
      throw new Error(`unknown type ${obj.type}`);
  }
};

const build = (ast) =>
  ast
    .map(buildLine)
    .filter((line) => typeof line === 'string')
    .join('\n');

const compile = (str) => {
  const ast = parse(str);
  return build(ast);
};

module.exports = {
  parse,
  parseLine,
  build,
  buildLine,
  compile,
};
