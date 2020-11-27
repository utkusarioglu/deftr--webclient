import { createMount } from '@material-ui/core/test-utils';
import LocalTextUtil from './LocalText.util';

describe('LocalText.tsx', () => {
  describe('LocalTextUtil', () => {
    let mount: ReturnType<typeof createMount>;

    beforeAll(() => {
      mount = createMount();
    });

    afterAll(() => {
      mount.cleanUp();
    });

    test('Shallow', () => {
      const wrapped = mount(<LocalTextUtil {...{ code: 'appName' }} />);
      expect(wrapped.text()).toStrictEqual('Deftr');
    });
  });
});
