import { codeToPhrase } from './local-text.service';

describe('local-text.service.ts', () => {
  describe('codeToPhrase', () => {
    test('Send placeholder for absent translation', () => {
      const phrase = codeToPhrase('aaaaaa'); // this is not a code that exists
      expect(phrase).toStrictEqual(['---']);
    });
  });
});
