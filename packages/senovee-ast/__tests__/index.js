/* eslint-disable no-irregular-whitespace */
const ast = require('../src');

describe('senovee-ast', () => {
  it('exports functions', () => {
    expect(ast).toHaveProperty('parse');
    expect(ast).toHaveProperty('parseLine');
    expect(ast).toHaveProperty('parseTags');
    expect(ast).toHaveProperty('build');
    expect(ast).toHaveProperty('buildLine');
    expect(ast).toHaveProperty('buildTags');
    expect(ast).toHaveProperty('compile');
  });
});
