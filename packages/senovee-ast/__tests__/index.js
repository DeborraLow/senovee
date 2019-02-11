/* eslint-disable no-irregular-whitespace */
const ast = require('../src');

const { parse, parseLine, build, buildLine, compile } = ast;

describe('senovee-ast', () => {
  it('exports functions', () => {
    expect(ast).toHaveProperty('parse');
    expect(ast).toHaveProperty('parseLine');
    expect(ast).toHaveProperty('build');
    expect(ast).toHaveProperty('buildLine');
    expect(ast).toHaveProperty('compile');
  });

  describe('.parse', () => {
    it('works with null string', () => {
      expect(parse('')).toMatchObject([{ type: 'br', body: '' }]);
    });
    it('works with single line', () => {
      expect(parse('　')).toMatchObject([{ type: 'br', body: '' }]);
      expect(parse('あいうえお')).toMatchObject([
        { type: 'unknown', body: 'あいうえお' },
      ]);
      expect(parse('　地の文')).toMatchObject([
        { type: 'text', body: '地の文' },
      ]);
      expect(parse('A　地の文')).toMatchObject([
        { type: 'text', body: '地の文', symbol: 'A' },
      ]);
      expect(parse('「セリフ」')).toMatchObject([
        { type: 'brackets', body: 'セリフ' },
      ]);
      expect(parse('A「セリフ」')).toMatchObject([
        { type: 'brackets', body: 'セリフ', symbol: 'A' },
      ]);
      expect(parse('（カッコ書き）')).toMatchObject([
        { type: 'parenthesis', body: 'カッコ書き' },
      ]);
      expect(parse('A（カッコ書き）')).toMatchObject([
        { type: 'parenthesis', body: 'カッコ書き', symbol: 'A' },
      ]);
      expect(parse('// コメント')).toMatchObject([
        { type: 'comment', body: 'コメント' },
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
          body: 'これは最初の地の文です。',
          symbol: 'A',
        },
        { type: 'text', body: '次の行ですよ。', symbol: 'A' },
        { type: 'br', body: '' },
        { type: 'brackets', body: 'おはようございます' },
        { type: 'br', body: '' },
        { type: 'parenthesis', body: 'いや、もう夜だが……', symbol: 'O' },
      ]);
    });
  });

  describe('.parseLine', () => {
    it('returns type: "br"', () => {
      expect(parseLine('')).toMatchObject({ type: 'br', body: '' });
      expect(parseLine(' ')).toMatchObject({ type: 'br', body: '' });
      expect(parseLine('\t')).toMatchObject({ type: 'br', body: '' });
      expect(parseLine('  ')).toMatchObject({ type: 'br', body: '' });
      expect(parseLine('    ')).toMatchObject({ type: 'br', body: '' });
      expect(parseLine('　　')).toMatchObject({ type: 'br', body: '' });
    });
    it('returns type: "text"', () => {
      expect(parseLine('　ほげ')).toMatchObject({
        type: 'text',
        body: 'ほげ',
      });
      expect(parseLine('　。')).toMatchObject({
        type: 'text',
        body: '。',
      });
      expect(parseLine('B　Ｂが綴っている。')).toMatchObject({
        type: 'text',
        body: 'Ｂが綴っている。',
        symbol: 'B',
      });
      expect(parseLine('　「地の文だけどカッコで始まる場合」')).toMatchObject({
        type: 'text',
        body: '「地の文だけどカッコで始まる場合」',
      });
    });
    it('returns type: "parenthesis"', () => {
      expect(parseLine('（）')).toMatchObject({
        type: 'parenthesis',
        body: '',
      });
      expect(parseLine('（どういうこと？）')).toMatchObject({
        type: 'parenthesis',
        body: 'どういうこと？',
      });
      expect(parseLine('X（私は誰？）')).toMatchObject({
        type: 'parenthesis',
        body: '私は誰？',
        symbol: 'X',
      });
      expect(parseLine('（（（強い）））')).toMatchObject({
        type: 'parenthesis',
        body: '（（強い））',
      });
    });
    it('returns type: "brackets"', () => {
      expect(parseLine('「」')).toMatchObject({
        type: 'brackets',
        body: '',
      });
      expect(parseLine('「こんにちは」')).toMatchObject({
        type: 'brackets',
        body: 'こんにちは',
      });
      expect(parseLine('A「私はＡです」')).toMatchObject({
        type: 'brackets',
        body: '私はＡです',
        symbol: 'A',
      });
      expect(parseLine('「「「「やっほー！！！」」」」')).toMatchObject({
        type: 'brackets',
        body: '「「「やっほー！！！」」」',
      });
    });
    it('returns type: "comment"', () => {
      expect(parseLine('//コメント')).toMatchObject({
        type: 'comment',
        body: 'コメント',
      });
      expect(parseLine('// スペース入り')).toMatchObject({
        type: 'comment',
        body: 'スペース入り',
      });
      expect(parseLine('///// たくさんスラッシュ')).toMatchObject({
        type: 'comment',
        body: '/// たくさんスラッシュ',
      });
    });
    it('returns type: "unknown"', () => {
      expect(parseLine('行頭から書いてるやつ')).toMatchObject({
        type: 'unknown',
        body: '行頭から書いてるやつ',
      });
      expect(parseLine('↓')).toMatchObject({
        type: 'unknown',
        body: '↓',
      });
      expect(parseLine('ABC')).toMatchObject({
        type: 'unknown',
        body: 'ABC',
      });
      expect(parseLine('jsです')).toMatchObject({
        type: 'unknown',
        body: 'jsです',
      });
    });
    it('trims trailing whitespace', () => {
      expect(parseLine('　ここに空白が→→　　')).toMatchObject({
        type: 'text',
        body: 'ここに空白が→→',
      });
      expect(parseLine('     ')).toMatchObject({
        type: 'br',
        body: '',
      });
      expect(parseLine('「そうだね」 ')).toMatchObject({
        type: 'brackets',
        body: 'そうだね',
      });
      expect(parseLine('O（そうか？）    　　')).toMatchObject({
        type: 'parenthesis',
        body: 'そうか？',
        symbol: 'O',
      });
      expect(parseLine('// コメント --  ')).toMatchObject({
        type: 'comment',
        body: 'コメント --',
      });
      expect(parseLine('～ ～ ～ ')).toMatchObject({
        type: 'unknown',
        body: '～ ～ ～',
      });
    });
  });

  describe('.build', () => {
    it('works with empty array', () => {
      expect(build([])).toBe('');
    });
    it('works', () => {
      expect(
        build([
          { type: 'text', body: '地の文' },
          { type: 'parenthesis', body: '考え事' },
          { type: 'brackets', body: 'うにゃにゃ', symbol: 'A' },
          {
            type: 'comment',
            body: 'コメントはレンダリングされてはいかんのじゃ',
          },
          { type: 'br', body: '' },
          { type: 'text', body: 'うん。' },
          { type: 'unknown', body: '？？？' },
        ])
      ).toBe('　地の文\n（考え事）\n「うにゃにゃ」\n\n　うん。\n？？？');
    });
  });

  describe('.buildLine', () => {
    it('recognizes type: "br"', () => {
      expect(buildLine({ type: 'br', body: '' })).toBe('');
    });
    it('recognizes type: "text"', () => {
      expect(buildLine({ type: 'text', body: 'あ' })).toBe('　あ');
      expect(buildLine({ type: 'text', body: 'どうもどうも。' })).toBe(
        '　どうもどうも。'
      );
      expect(buildLine({ type: 'text', body: '「！」' })).toBe('　「！」');
    });
    it('recognizes type: "parenthesis"', () => {
      expect(buildLine({ type: 'parenthesis', body: 'あ' })).toBe('（あ）');
      expect(buildLine({ type: 'parenthesis', body: 'どうもどうも。' })).toBe(
        '（どうもどうも。）'
      );
      expect(buildLine({ type: 'parenthesis', body: '「！」' })).toBe(
        '（「！」）'
      );
    });
    it('recognizes type: "brackets"', () => {
      expect(buildLine({ type: 'brackets', body: 'あ' })).toBe('「あ」');
      expect(buildLine({ type: 'brackets', body: 'どうもどうも。' })).toBe(
        '「どうもどうも。」'
      );
      expect(buildLine({ type: 'brackets', body: '「！」' })).toBe(
        '「「！」」'
      );
    });
    it('recognizes type: "comment"', () => {
      expect(buildLine({ type: 'comment', body: '' })).toBe(null);
      expect(buildLine({ type: 'comment', body: 'あ' })).toBe(null);
      expect(
        buildLine({ type: 'comment', body: 'コメントに何が書いてあろうとも。' })
      ).toBe(null);
    });
    it('recognizes type: "unknown"', () => {
      expect(buildLine({ type: 'unknown', body: '' })).toBe('');
      expect(buildLine({ type: 'unknown', body: 'これはそのまま' })).toBe(
        'これはそのまま'
      );
      expect(buildLine({ type: 'unknown', body: 'ーーー' })).toBe('ーーー');
    });
    it('does not render symbol', () => {
      expect(buildLine({ type: 'brackets', body: 'あ', symbol: 'A' })).toBe(
        '「あ」'
      );
      expect(
        buildLine({ type: 'parenthesis', body: 'はいはい', symbol: 'B' })
      ).toBe('（はいはい）');
      expect(
        buildLine({ type: 'text', body: 'と思う俺だった。', symbol: 'O' })
      ).toBe('　と思う俺だった。');
    });
  });

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
