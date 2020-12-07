import type { ServerRequest } from '../../../../deftr--public-api/src';
import { WebsocketConnection } from './websocket';
import store from '../../store';
import { Rest } from './rest';
import { RestModule } from './server-connection.types';

/**
 * Handles all the communications with the server
 *
 * @remarks
 * This class is intended to be the main way the app sends messages to
 * the server.
 * The class favors websocket api and uses rest as a fallback.
 */
class ServerConnection {
  private _restInstance?: Rest;
  private _websocketInstance: WebsocketConnection;

  /**
   * Instantiates the server connection
   *
   * @remarks
   * constructor tries to establish a websocket connection as that is
   * the preferred communication method for this app
   */
  constructor() {
    this._websocketInstance = new WebsocketConnection();
  }

  /**
   * Sends the message to the server.
   *
   * @remarks
   * If a websocket connection is available,
   * it will use the websocket method to send the message. Otherwise it will
   * use the rest method to send through rest api.
   *
   * @privateRemarks
   * !TODO
   * The type used for send would do much better with a generic definition that
   * helps to define which messagelets of a {@link ServerRequest} is intended
   * by the send operation.
   *
   * @param message - The message to be sent to the server
   */
  public async send(message: ServerRequest): Promise<void> {
    switch (store.getState().serverConnection.method) {
      case 'websocket':
        this.websocket(message);
        break;

      case 'rest':
        this.rest(message);
        break;

      default:
        throw new Error('Connection method not recognized');
    }
  }

  /**
   * Sends the message using rest api
   *
   * @remarks
   * Notice that the there is no promise.then pattern for this
   * rest request. Please see {@link Rest} class for the explanation
   * of this design.
   *
   * @param message - The message to be sent to the server
   */
  public async rest(message: ServerRequest) {
    if (this._restInstance) {
      this._restInstance.send(message);
    } else {
      const restModule: RestModule = await import('./rest');
      this._restInstance = new restModule.Rest();
      this._restInstance?.send(message);
    }
  }

  /**
   * Send the message using websocket connection
   * @param message - Message to be sent
   */
  public websocket(message: ServerRequest) {
    this._websocketInstance?.send(message);
  }
}

export default new ServerConnection();
