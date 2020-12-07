import { ACTION_STATES, ACTION_TYPES } from '../../store/constants';
import { initialState } from './server-connection.constants';
import type { FSA } from '../../store/types';
import type {
  ServerConnection,
  ServerConnectionActions,
} from './server-connection.types';

/**
 * Reducer for Server Connection service
 * @param state ServerConnection state slice
 * @param action Action defined by {@link FSA}
 */
function serverConnectionReducer(
  state: ServerConnection = initialState,
  action: FSA<ServerConnectionActions>
): ServerConnection {
  switch (action.type) {
    // Overrides current connection setting. But any of the
    // websocket events with also override this action
    case ACTION_TYPES.SERVER_CONNECTION__METHOD:
      if (action.state === ACTION_STATES.FAIL) {
        return state;
      }
      state.method = action.payload;
      return state;

    // All states where websocket is no longer usable, switch to rest
    case ACTION_TYPES.REDUX_WEBSOCKET__BROKEN:
    case ACTION_TYPES.REDUX_WEBSOCKET__CLOSED:
    case ACTION_TYPES.REDUX_WEBSOCKET__WEBSOCKET_DISCONNECT:
    case ACTION_TYPES.REDUX_WEBSOCKET__ERROR:
      state.method = 'rest' as 'rest';
      return state;

    // Switch to websocket when it's available
    case ACTION_TYPES.REDUX_WEBSOCKET__OPEN:
    case ACTION_TYPES.REDUX_WEBSOCKET__RECONNECTED:
      state.method = 'websocket' as 'websocket';
      return state;

    default:
      return state;
  }
}

export default serverConnectionReducer;
