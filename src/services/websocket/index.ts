import { connect } from '@giantmachines/redux-websocket';
import store from '../../store/store';
import CONFIG from '../../config';

/**
 * Initiates websocket connection with the server
 */
export function initiateWebsocketConnection() {
  const scheme = 'ws';
  const port = CONFIG.httpPort;
  const hostname = window.location.hostname;
  const dir = 'ws';
  store.dispatch(connect(`${scheme}://${hostname}:${port}/${dir}`));
}
