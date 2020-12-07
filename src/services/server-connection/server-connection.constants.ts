import type {
  ServerConnection,
  RestRequestMap,
} from './server-connection.types';

/**
 * Initial state for ServerConnection state slice
 */
export const initialState: ServerConnection = {
  method: 'rest' as 'rest',
};

/**
 * Defines the rest methods that ought to be used for different
 * message keys
 *
 * @remarks
 * As messages are primarily designed for websocket exchange, they don't
 * carry any method information for rest api in them. This constant is
 * designed to assist the {@link Rest} class to shape its request in cases
 * where rest api is used. Rest is designed to be a fallback method to
 * websockets in this project.
 */
export const restRequestMap: RestRequestMap = {
  test: 'get',
  login: 'post',
};
