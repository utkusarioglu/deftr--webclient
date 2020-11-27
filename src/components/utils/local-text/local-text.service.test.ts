import { codeToPhrase, codeToLocalString } from './local-text.service';

describe('local-text.service.ts', () => {
  describe('codeToPhrase', () => {
    test('Handle absent translation', () => {
      const phrase = codeToPhrase('aaaaaa'); // this is not a code that exists
      expect(phrase).toStrictEqual(['---']);
    });

    test('Return correct app name phrase', () => {
      const appName = codeToPhrase('appName');
      expect(appName).toStrictEqual(['Deftr']);
    });

    test('Return correct app name local string', () => {
      const appName = codeToLocalString('appName');
      expect(appName).toStrictEqual('Deftr');
    });
  });
});
