const { parse } = require('../src');

describe('senovee-ast', () => {
  describe('.parse', () => {
    it('works with null string', () => {
      expect(parse('')).toMatchObject([{ type: 'br', body: [''] }]);
    });
    it('works with single line', () => {
      expect(parse('　')).toMatchObject([{ type: 'br', body: [''] }]);
      expect(parse('あいうえお')).toMatchObject([
        { type: 'unknown', body: ['あいうえお'] },
      ]);
      expect(parse('　地の文')).toMatchObject([
        { type: 'text', body: ['地の文'] },
      ]);
      expect(parse('A　地の文')).toMatchObject([
        { type: 'text', body: ['地の文'], symbol: 'A' },
      ]);
      expect(parse('「セリフ」')).toMatchObject([
        { type: 'brackets', body: ['セリフ'] },
      ]);
      expect(parse('A「セリフ」')).toMatchObject([
        { type: 'brackets', body: ['セリフ'], symbol: 'A' },
      ]);
      expect(parse('（カッコ書き）')).toMatchObject([
        { type: 'parenthesis', body: ['カッコ書き'] },
      ]);
      expect(parse('A（カッコ書き）')).toMatchObject([
        { type: 'parenthesis', body: ['カッコ書き'], symbol: 'A' },
      ]);
      expect(parse('// コメント')).toMatchObject([
        { type: 'comment', body: ['コメント'] },
      ]);
    });
    it('works with multiline', () => {
      expect(
        parse(
          'A　これは最初の地の文です。\nA　次の行ですよ。\n\n「おはようございます」\n\nO（いや、もう夜だが……）'
        )
      ).toMatchObject([
        {
          type: 'text',
          body: ['これは最初の地の文です。'],
          symbol: 'A',
        },
        { type: 'text', body: ['次の行ですよ。'], symbol: 'A' },
        { type: 'br', body: [''] },
        { type: 'brackets', body: ['おはようございます'] },
        { type: 'br', body: [''] },
        { type: 'parenthesis', body: ['いや、もう夜だが……'], symbol: 'O' },
      ]);
    });
  });
});
