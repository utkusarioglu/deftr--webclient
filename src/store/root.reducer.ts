import { combineReducers } from 'redux';
import RootReducer from './types';
import serverConnectionReducer from '../services/server-connection/server-connection.reducer';

export const rootReducer = combineReducers<RootReducer>({
  serverConnection: serverConnectionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
