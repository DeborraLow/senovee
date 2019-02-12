const { parseLine } = require('../src');

describe('senovee-ast', () => {
  describe('.parseLine', () => {
    it('returns type: "br"', () => {
      expect(parseLine('')).toMatchObject({
        type: 'br',
        body: [{ tag: 'br' }],
      });
      expect(parseLine(' ')).toMatchObject({
        type: 'br',
        body: [{ tag: 'br' }],
      });
      expect(parseLine('\t')).toMatchObject({
        type: 'br',
        body: [{ tag: 'br' }],
      });
      expect(parseLine('  ')).toMatchObject({
        type: 'br',
        body: [{ tag: 'br' }],
      });
      expect(parseLine('    ')).toMatchObject({
        type: 'br',
        body: [{ tag: 'br' }],
      });
      expect(parseLine('　　')).toMatchObject({
        type: 'br',
        body: [{ tag: 'br' }],
      });
    });
    it('returns type: "text"', () => {
      expect(parseLine('　ほげ')).toMatchObject({
        type: 'text',
        body: ['ほげ'],
      });
      expect(parseLine('　。')).toMatchObject({
        type: 'text',
        body: ['。'],
      });
      expect(parseLine('B　Ｂが綴っている。')).toMatchObject({
        type: 'text',
        body: ['Ｂが綴っている。'],
        symbol: 'B',
      });
      expect(parseLine('　「地の文だけどカッコで始まる場合」')).toMatchObject({
        type: 'text',
        body: ['「地の文だけどカッコで始まる場合」'],
      });
    });
    it('returns type: "parenthesis"', () => {
      expect(parseLine('（）')).toMatchObject({
        type: 'parenthesis',
        body: [],
      });
      expect(parseLine('（どういうこと？）')).toMatchObject({
        type: 'parenthesis',
        body: ['どういうこと？'],
      });
      expect(parseLine('X（私は誰？）')).toMatchObject({
        type: 'parenthesis',
        body: ['私は誰？'],
        symbol: 'X',
      });
      expect(parseLine('（（（強い）））')).toMatchObject({
        type: 'parenthesis',
        body: ['（（強い））'],
      });
    });
    it('returns type: "brackets"', () => {
      expect(parseLine('「」')).toMatchObject({
        type: 'brackets',
        body: [],
      });
      expect(parseLine('「こんにちは」')).toMatchObject({
        type: 'brackets',
        body: ['こんにちは'],
      });
      expect(parseLine('A「私はＡです」')).toMatchObject({
        type: 'brackets',
        body: ['私はＡです'],
        symbol: 'A',
      });
      expect(parseLine('「「「「やっほー！！！」」」」')).toMatchObject({
        type: 'brackets',
        body: ['「「「やっほー！！！」」」'],
      });
    });
    it('returns type: "comment"', () => {
      expect(parseLine('//コメント')).toMatchObject({
        type: 'comment',
        body: ['コメント'],
      });
      expect(parseLine('// スペース入り')).toMatchObject({
        type: 'comment',
        body: ['スペース入り'],
      });
      expect(parseLine('///// たくさんスラッシュ')).toMatchObject({
        type: 'comment',
        body: ['/// たくさんスラッシュ'],
      });
    });
    it('returns type: "unknown"', () => {
      expect(parseLine('行頭から書いてるやつ')).toMatchObject({
        type: 'unknown',
        body: ['行頭から書いてるやつ'],
      });
      expect(parseLine('↓')).toMatchObject({
        type: 'unknown',
        body: ['↓'],
      });
      expect(parseLine('ABC')).toMatchObject({
        type: 'unknown',
        body: ['ABC'],
      });
      expect(parseLine('jsです')).toMatchObject({
        type: 'unknown',
        body: ['jsです'],
      });
    });
    it('trims trailing whitespace', () => {
      expect(parseLine('　ここに空白が→→　　')).toMatchObject({
        type: 'text',
        body: ['ここに空白が→→'],
      });
      expect(parseLine('     ')).toMatchObject({
        type: 'br',
        body: [{ tag: 'br' }],
      });
      expect(parseLine('「そうだね」 ')).toMatchObject({
        type: 'brackets',
        body: ['そうだね'],
      });
      expect(parseLine('O（そうか？）    　　')).toMatchObject({
        type: 'parenthesis',
        body: ['そうか？'],
        symbol: 'O',
      });
      expect(parseLine('// コメント --  ')).toMatchObject({
        type: 'comment',
        body: ['コメント --'],
      });
      expect(parseLine('～ ～ ～ ')).toMatchObject({
        type: 'unknown',
        body: ['～ ～ ～'],
      });
    });
  });
});
