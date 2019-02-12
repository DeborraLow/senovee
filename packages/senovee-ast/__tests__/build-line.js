const { buildLine } = require('../src');

describe('senovee-ast', () => {
  describe('.buildLine', () => {
    it('recognizes type: "br"', () => {
      expect(buildLine({ type: 'br', body: [''] })).toMatchObject(['']);
    });
    it('recognizes type: "text"', () => {
      expect(buildLine({ type: 'text', body: ['あ'] })).toMatchObject([
        '　',
        'あ',
      ]);
      expect(
        buildLine({ type: 'text', body: ['どうもどうも。'] })
      ).toMatchObject(['　', 'どうもどうも。']);
      expect(buildLine({ type: 'text', body: ['「！」'] })).toMatchObject([
        '　',
        '「！」',
      ]);
    });
    it('recognizes type: "parenthesis"', () => {
      expect(buildLine({ type: 'parenthesis', body: ['あ'] })).toMatchObject([
        '（',
        'あ',
        '）',
      ]);
      expect(
        buildLine({ type: 'parenthesis', body: ['どうもどうも。'] })
      ).toMatchObject(['（', 'どうもどうも。', '）']);
      expect(
        buildLine({ type: 'parenthesis', body: ['「！」'] })
      ).toMatchObject(['（', '「！」', '）']);
    });
    it('recognizes type: "brackets"', () => {
      expect(buildLine({ type: 'brackets', body: ['あ'] })).toMatchObject([
        '「',
        'あ',
        '」',
      ]);
      expect(
        buildLine({ type: 'brackets', body: ['どうもどうも。'] })
      ).toMatchObject(['「', 'どうもどうも。', '」']);
      expect(buildLine({ type: 'brackets', body: ['「！」'] })).toMatchObject([
        '「',
        '「！」',
        '」',
      ]);
    });
    it('recognizes type: "comment"', () => {
      expect(buildLine({ type: 'comment', body: [''] })).toBe(null);
      expect(buildLine({ type: 'comment', body: ['あ'] })).toBe(null);
      expect(
        buildLine({
          type: 'comment',
          body: ['コメントに何が書いてあろうとも。'],
        })
      ).toBe(null);
    });
    it('recognizes type: "unknown"', () => {
      expect(buildLine({ type: 'unknown', body: [''] })).toMatchObject(['']);
      expect(
        buildLine({ type: 'unknown', body: ['これはそのまま'] })
      ).toMatchObject(['これはそのまま']);
      expect(buildLine({ type: 'unknown', body: ['ーーー'] })).toMatchObject([
        'ーーー',
      ]);
    });
    it('does not render symbol', () => {
      expect(
        buildLine({ type: 'brackets', body: ['あ'], symbol: 'A' })
      ).toMatchObject(['「', 'あ', '」']);
      expect(
        buildLine({ type: 'parenthesis', body: ['はいはい'], symbol: 'B' })
      ).toMatchObject(['（', 'はいはい', '）']);
      expect(
        buildLine({ type: 'text', body: ['と思う俺だった。'], symbol: 'O' })
      ).toMatchObject(['　', 'と思う俺だった。']);
    });
  });
});
