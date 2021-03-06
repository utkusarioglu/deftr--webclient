/**
 * Allowed action types
 *
 * @remarks
 * Any new store participant service or feature will need to enlist their
 * actions on this list for them to be available.
 */
export enum ACTION_TYPES {
  /**
   * These come from {@link https://github.com/giantmachines/redux-websocket | giantmachines/redux-websocket}
   */
  REDUX_WEBSOCKET__MESSAGE = 'REDUX_WEBSOCKET::MESSAGE',
  REDUX_WEBSOCKET__WEBSOCKET_CONNECT = 'REDUX_WEBSOCKET::WEBSOCKET_CONNECT',
  REDUX_WEBSOCKET__WEBSOCKET_DISCONNECT = 'REDUX_WEBSOCKET::WEBSOCKET_DISCONNECT',
  REDUX_WEBSOCKET__WEBSOCKET_SEND = 'REDUX_WEBSOCKET::WEBSOCKET_SEND',
  REDUX_WEBSOCKET__OPEN = 'REDUX_WEBSOCKET::OPEN',
  REDUX_WEBSOCKET__CLOSED = 'REDUX_WEBSOCKET::CLOSED',
  REDUX_WEBSOCKET__BROKEN = 'REDUX_WEBSOCKET::BROKEN',
  REDUX_WEBSOCKET__BEGIN_RECONNECT = 'REDUX_WEBSOCKET::BEGIN_RECONNECT',
  REDUX_WEBSOCKET__RECONNECT_ATTEMPT = 'REDUX_WEBSOCKET::RECONNECT_ATTEMPT',
  REDUX_WEBSOCKET__RECONNECTED = 'REDUX_WEBSOCKET::RECONNECTED',
  REDUX_WEBSOCKET__ERROR = 'REDUX_WEBSOCKET::ERROR',

  /**
   * ServerConnection service
   */
  SERVER_CONNECTION__METHOD = 'SERVER_CONNECTION::METHOD',
}

/**
 * Allowed action states
 */
export enum ACTION_STATES {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
