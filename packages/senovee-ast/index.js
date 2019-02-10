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

module.exports = {
  parse,
  parseLine,
};
