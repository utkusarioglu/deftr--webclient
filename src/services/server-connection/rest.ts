import axios from 'axios';
import type { AxiosInstance } from 'axios';
import CONFIG from '../../config';
import store from '../../store';
import { ACTION_TYPES, ACTION_STATES } from '../../store/constants';
import type { FSA } from '../../store/types';
import type {
  ServerRequest,
  ServerResponse,
  ServerRequestKeys,
} from '../../../../deftr--public-api/src';
import { restRequestMap } from './server-connection.constants';

const { hypertextScheme, hostname, serverPort } = CONFIG;

/**
 * Uses Axios to establish rest api connection to the server
 * Intended as a fallback for websocket connection, and is meant to be
 * called lazily
 */
export class Rest {
  private _instance: AxiosInstance;

  /**
   * Creates axios instance with the
   */
  constructor() {
    const axiosConfig = {
      baseURL: `${hypertextScheme}://${hostname}:${serverPort}/rest`,
      timeout: 1000,
    };
    this._instance = axios.create(axiosConfig);
  }

  /**
   * Sends the message through rest api
   *
   * @remarks
   * Splits the websocket message object by keys. Uses the keys as url
   * to send the value as data or query depending on the rest method.
   * rest method is read from {@link restRequestMap}
   *
   * Note that this method essentially hijacks the store actions of the
   * websocket module. For the rest of the app and the reducers in the store,
   * management of data always happens through websocket actions.
   *
   * @privateRemarks
   * Currently the get requests cannot send the value of given message
   * as the values are casted as the data property of the request. This
   * needs to be fixed before production.
   *
   * @param message - Message to be sent to the server
   */
  public send(message: ServerRequest) {
    Object.entries(message).forEach(([url, data]) => {
      const method = restRequestMap[url as ServerRequestKeys] || 'get';
      this._instance
        .request({
          method,
          url,
          data,
        })
        .then((axiosResponse) => {
          store.dispatch<FSA<ServerResponse>>({
            state: ACTION_STATES.SUCCESS,
            type: ACTION_TYPES.REDUX_WEBSOCKET__MESSAGE,
            payload: axiosResponse.data,
          });
        });
    });
  }
}
