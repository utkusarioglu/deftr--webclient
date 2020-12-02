import { combineReducers } from 'redux';
import IRootReducer from './store.types';

export const rootReducer = combineReducers<IRootReducer>({
  app: () => null,
});

export type RootState = ReturnType<typeof rootReducer>;
