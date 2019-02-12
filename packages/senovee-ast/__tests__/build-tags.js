const { buildTags } = require('../src');

describe('senovee-ast', () => {
  describe('.buildTags', () => {
    it('works', () => {
      expect(
        buildTags([
          '我々は',
          {
            tag: 'mark',
            target: '恒久の',
          },
          {
            tag: 'ruby',
            target: '権利',
            ruby: 'けんり',
          },
          'を望む',
        ])
      ).toBe('我々は｜恒久の《・・・》｜権利《けんり》を望む');
    });
    it('returns null string with empty array', () => {
      expect(buildTags([])).toBe('');
    });
    it('joins string in specified array', () => {
      expect(buildTags(['あいうえお'])).toBe('あいうえお');
      expect(buildTags(['１２３', '４'])).toBe('１２３４');
      expect(buildTags(['１２', '３４'])).toBe('１２３４');
      expect(buildTags(['', '１２３４'])).toBe('１２３４');
      expect(buildTags(['１', '', '２', '', '', '３４', ''])).toBe('１２３４');
    });
    it('recognizes ruby tag', () => {
      expect(
        buildTags([{ tag: 'ruby', target: '単体試験', ruby: 'ユニットテスト' }])
      ).toBe('｜単体試験《ユニットテスト》');
      expect(
        buildTags([
          '流行りの',
          { tag: 'ruby', target: '我', ruby: 'おれ' },
          { tag: 'ruby', target: '我', ruby: 'おれ' },
        ])
      ).toBe('流行りの｜我《おれ》｜我《おれ》');
    });
    it('recognizes mark tag', () => {
      expect(buildTags([{ tag: 'mark', target: '単体試験' }])).toBe(
        '｜単体試験《・・・・》'
      );
      expect(buildTags([{ tag: 'mark', target: '神' }])).toBe('｜神《・》');
      expect(
        buildTags([
          { tag: 'mark', target: '神' },
          { tag: 'mark', target: '神' },
        ])
      ).toBe('｜神《・》｜神《・》');
    });
  });
});
