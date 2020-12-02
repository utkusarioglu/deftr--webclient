import { combineReducers } from 'redux';
import IRootReducer from './store.types';

export const rootReducer = combineReducers<IRootReducer>({
  app: () => {},
});

export type RootState = ReturnType<typeof rootReducer>;
