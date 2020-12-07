import { connect, send } from '@giantmachines/redux-websocket';
import store from '../../store';
import CONFIG from '../../config';
import { ServerRequest } from '../../../../deftr--public-api/src';

const { websocketScheme, serverPort, hostname } = CONFIG;

/**
 * Handles websocket connections with the server
 *
 * @remarks
 * This class acts as a wrapper for {@link https://github.com/giantmachines/redux-websocket | giantmachines/redux-websocket} library.
 * This allows the {@link ServerConnection} class to call rest and websockets
 * with symmetric apis.
 */
export class WebsocketConnection {
  /**
   * Instantiates WebsocketConnection class
   *
   * @remarks
   * Calls connect method to initiate the websocket connection
   *
   * @access public
   */
  constructor() {
    this.connect();
  }

  /**
   * Connects to the server using websocket api
   *
   * @remarks
   * scheme is retrieved from `config` module. Depending on the .env value
   * `REACT_APP_SECURE_SCHEMES`, the scheme may be `ws` or `wss`.
   * Serverport and hostname are also received from config.
   */
  connect() {
    store.dispatch(
      connect(`${websocketScheme}://${hostname}:${serverPort}/ws`)
    );
  }

  /**
   * Sends the message using websocket connection.
   * @param message - The message to be sent to the server
   */
  send(message: ServerRequest) {
    store.dispatch(send(message));
  }
}
