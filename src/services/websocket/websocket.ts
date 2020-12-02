import { connect } from '@giantmachines/redux-websocket';
import store from '../../store/store';
import CONFIG from '../../config';

export function initiateWebsocketConnection() {
  const scheme = 'ws';
  const port = CONFIG.httpPort;
  const domain = '192.168.1.152';
  const dir = 'ws';
  store.dispatch(connect(`${scheme}://${domain}:${port}/${dir}`));
}
