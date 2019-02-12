const { build } = require('../src');

describe('senovee-ast', () => {
  describe('.build', () => {
    it('works with empty array', () => {
      expect(build([])).toBe('');
    });
    it('works', () => {
      expect(
        build([
          { type: 'text', body: ['地の文'] },
          { type: 'parenthesis', body: ['考え事'] },
          { type: 'brackets', body: ['うにゃにゃ'], symbol: 'A' },
          {
            type: 'comment',
            body: ['コメントはレンダリングされてはいかんのじゃ'],
          },
          { type: 'br', body: [''] },
          { type: 'text', body: ['うん。'] },
          { type: 'unknown', body: ['？？？'] },
        ])
      ).toBe('　地の文\n（考え事）\n「うにゃにゃ」\n\n　うん。\n？？？');
    });
  });
});
