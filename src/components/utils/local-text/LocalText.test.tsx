import React from 'react';
import { safeCreate } from '@fluentui/test-utilities';

import LocalText from './LocalText';

describe('LocalText', () => {
  test('Shallow', () => {
    safeCreate(<LocalText {...{ code: 'login' }} />, (LocalText) => {
      expect(LocalText).toStrictEqual('yellow');
    });
  });
});
