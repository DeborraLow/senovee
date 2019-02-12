const { compile } = require('../src');

describe('senovee-ast', () => {
  describe('.compile', () => {
    it('works with null string', () => {
      expect(compile('')).toBe('');
    });
    it('works with single br', () => {
      expect(compile('\n')).toBe('\n');
    });
    it('works with single line', () => {
      expect(compile('　ただいま。')).toBe('　ただいま。');
      expect(compile('「まだいたの？」')).toBe('「まだいたの？」');
      expect(compile('（知らんがな）')).toBe('（知らんがな）');
      expect(compile('ーーースキル一覧ーーー')).toBe('ーーースキル一覧ーーー');
      expect(compile('// これは伏線です')).toBe('');
    });
    it('works with multi line', () => {
      expect(compile('　その時、天から声が響いた。\n\n「ワシじゃ」')).toBe(
        '　その時、天から声が響いた。\n\n「ワシじゃ」'
      );
    });
    it('does not render symbol', () => {
      expect(compile('A「Ａでーす」')).toBe('「Ａでーす」');
      expect(compile('B（Ｂです……）')).toBe('（Ｂです……）');
      expect(compile('C　Ｃなんだよなあ……。')).toBe('　Ｃなんだよなあ……。');
    });
  });
});
