const { buildLine } = require('../src');

describe('senovee-ast', () => {
  describe('.buildLine', () => {
    it('recognizes type: "br"', () => {
      expect(buildLine({ type: 'br', body: [''] })).toBe('');
    });
    it('recognizes type: "text"', () => {
      expect(buildLine({ type: 'text', body: ['あ'] })).toBe('　あ');
      expect(buildLine({ type: 'text', body: ['どうもどうも。'] })).toBe(
        '　どうもどうも。'
      );
      expect(buildLine({ type: 'text', body: ['「！」'] })).toBe('　「！」');
    });
    it('recognizes type: "parenthesis"', () => {
      expect(buildLine({ type: 'parenthesis', body: ['あ'] })).toBe('（あ）');
      expect(buildLine({ type: 'parenthesis', body: ['どうもどうも。'] })).toBe(
        '（どうもどうも。）'
      );
      expect(buildLine({ type: 'parenthesis', body: ['「！」'] })).toBe(
        '（「！」）'
      );
    });
    it('recognizes type: "brackets"', () => {
      expect(buildLine({ type: 'brackets', body: ['あ'] })).toBe('「あ」');
      expect(buildLine({ type: 'brackets', body: ['どうもどうも。'] })).toBe(
        '「どうもどうも。」'
      );
      expect(buildLine({ type: 'brackets', body: ['「！」'] })).toBe(
        '「「！」」'
      );
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
      expect(buildLine({ type: 'unknown', body: [''] })).toBe('');
      expect(buildLine({ type: 'unknown', body: ['これはそのまま'] })).toBe(
        'これはそのまま'
      );
      expect(buildLine({ type: 'unknown', body: ['ーーー'] })).toBe('ーーー');
    });
    it('does not render symbol', () => {
      expect(buildLine({ type: 'brackets', body: ['あ'], symbol: 'A' })).toBe(
        '「あ」'
      );
      expect(
        buildLine({ type: 'parenthesis', body: ['はいはい'], symbol: 'B' })
      ).toBe('（はいはい）');
      expect(
        buildLine({ type: 'text', body: ['と思う俺だった。'], symbol: 'O' })
      ).toBe('　と思う俺だった。');
    });
  });
});
