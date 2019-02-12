const { parseTags } = require('../src');

describe('senovee-ast', () => {
  describe('.parseTags', () => {
    it('returns empty array if src is null', () => {
      expect(parseTags('')).toMatchObject([]);
    });
    it('returns array of string if no tags', () => {
      expect(parseTags('タグなし')).toMatchObject(['タグなし']);
    });
    it('can parse ruby tag', () => {
      expect(parseTags('｜単体試験《ユニットテスト》')).toMatchObject([
        {
          target: '単体試験',
          ruby: 'ユニットテスト',
          tag: 'ruby',
        },
      ]);
      expect(
        parseTags('とある魔術の｜禁書目録《インデックス》は有名なラノベだ。')
      ).toMatchObject([
        'とある魔術の',
        {
          target: '禁書目録',
          ruby: 'インデックス',
          tag: 'ruby',
        },
        'は有名なラノベだ。',
      ]);
      expect(
        parseTags(
          '｜俺《おれ》たちは｜雰囲気《ふんいき》でテストを｜書《か》いている'
        )
      ).toMatchObject([
        { target: '俺', ruby: 'おれ', tag: 'ruby' },
        'たちは',
        { target: '雰囲気', ruby: 'ふんいき', tag: 'ruby' },
        'でテストを',
        { target: '書', ruby: 'か', tag: 'ruby' },
        'いている',
      ]);
      expect(
        parseTags('｜呵《か》｜呵《か》｜呵《か》｜々《か》')
      ).toMatchObject([
        { target: '呵', ruby: 'か', tag: 'ruby' },
        { target: '呵', ruby: 'か', tag: 'ruby' },
        { target: '呵', ruby: 'か', tag: 'ruby' },
        { target: '々', ruby: 'か', tag: 'ruby' },
      ]);
    });
    it('can manage broken ruby tag', () => {
      expect(parseTags('無棒《これ対応してるサービスもある》')).toMatchObject([
        '無棒《これ対応してるサービスもある》',
      ]);
      expect(parseTags('ああ｜棒が｜数多《あまた》')).toMatchObject([
        'ああ｜棒が',
        {
          target: '数多',
          ruby: 'あまた',
          tag: 'ruby',
        },
      ]);
      expect(parseTags('｜過剰な括弧《かっこつけすぎ》》')).toMatchObject([
        {
          target: '過剰な括弧',
          ruby: 'かっこつけすぎ',
          tag: 'ruby',
        },
        '》',
      ]);
      expect(parseTags('｜過剰な括弧《《かっこつけすぎ》')).toMatchObject([
        '｜過剰な括弧《《かっこつけすぎ》',
      ]);
      expect(parseTags('｜過剰な括弧《かっこ《つけすぎ》')).toMatchObject([
        '｜過剰な括弧《かっこ《つけすぎ》',
      ]);
      expect(parseTags('｜余計な》括弧《かっこ》')).toMatchObject([
        '｜余計な》括弧《かっこ》',
      ]);
      expect(parseTags('｜余計な棒《ぼ｜う》')).toMatchObject([
        '｜余計な棒《ぼ｜う》',
      ]);
      expect(parseTags('｜再帰《｜再帰《さいき》》は内側優先')).toMatchObject([
        '｜再帰《',
        {
          target: '再帰',
          ruby: 'さいき',
          tag: 'ruby',
        },
        '》は内側優先',
      ]);
    });
    it('can parse mark tag', () => {
      expect(parseTags('《《傍点を振れ》》')).toMatchObject([
        {
          target: '傍点を振れ',
          tag: 'mark',
        },
      ]);
      expect(parseTags('傍点《《を》》振れ')).toMatchObject([
        '傍点',
        {
          target: 'を',
          tag: 'mark',
        },
        '振れ',
      ]);
      expect(parseTags('《《傍》》《《点》》を《《振れ》》')).toMatchObject([
        {
          target: '傍',
          tag: 'mark',
        },
        {
          target: '点',
          tag: 'mark',
        },
        'を',
        {
          target: '振れ',
          tag: 'mark',
        },
      ]);
    });
    it('can manage broken mark tag', () => {
      expect(parseTags('《《《左が多い》》')).toMatchObject([
        '《',
        {
          target: '左が多い',
          tag: 'mark',
        },
      ]);
      expect(parseTags('《《右が多い》》》')).toMatchObject([
        {
          target: '右が多い',
          tag: 'mark',
        },
        '》',
      ]);
      expect(parseTags('《《中に混じってしまう《やつ》》')).toMatchObject([
        '《《中に混じってしまう《やつ》》',
      ]);
      expect(parseTags('《《中に混じってしまう》やつ》》')).toMatchObject([
        '《《中に混じってしまう》やつ》》',
      ]);
      expect(parseTags('《《》》')).toMatchObject(['《《》》']);
      expect(parseTags('《《《》》》')).toMatchObject(['《《《》》》']);
      expect(parseTags('《《《》｜》》')).toMatchObject(['《《《》｜》》']);
      expect(parseTags('《《《｜》》》')).toMatchObject(['《《《｜》》》']);
      expect(parseTags('《《｜《》》》')).toMatchObject(['《《｜《》》》']);
      expect(parseTags('《》《あ》》')).toMatchObject(['《》《あ》》']);
    });

    it('can parse combination of ruby and mark tags', () => {
      expect(parseTags('つまり《《あなた》》は｜★《犯人》だ')).toMatchObject([
        'つまり',
        {
          target: 'あなた',
          tag: 'mark',
        },
        'は',
        {
          target: '★',
          ruby: '犯人',
          tag: 'ruby',
        },
        'だ',
      ]);
      expect(
        parseTags('｜白《勝ち》｜黒《負け》《《決めよう》》')
      ).toMatchObject([
        {
          target: '白',
          ruby: '勝ち',
          tag: 'ruby',
        },
        {
          target: '黒',
          ruby: '負け',
          tag: 'ruby',
        },
        {
          target: '決めよう',
          tag: 'mark',
        },
      ]);
    });
  });
});
