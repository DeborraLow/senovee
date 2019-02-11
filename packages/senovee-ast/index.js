const parseLine = (line) => {
  const trimed = line.trim();
  let parseObject;

  if (trimed.length === 0) {
    parseObject = {
      type: 'br',
      content: null,
    };
  }
  if (line[0] === '（' && trimed[trimed.length - 1] === '）') {
    parseObject = {
      type: 'parenthesis',
      content: line.slice(1, trimed.length - 1),
    };
  } else if (line[0] === '「' && trimed[trimed.length - 1] === '」') {
    parseObject = {
      type: 'brackets',
      content: line.slice(1, trimed.length - 1),
    };
  } else if (line[0] === '　') {
    parseObject = {
      type: 'text',
      content: trimed,
    };
  } else if (line.slice(0, 2) === '//') {
    parseObject = {
      type: 'comment',
      content: trimed.slice(2),
    };
  } else {
    parseObject = {
      type: 'unknown',
      content: trimed,
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
    default:
      return '';
  }
};

const build = (ast) => ast.map(buildLine).join('\n');

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
