import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { filesActionsType, userActionsAuthType } from '../utils/types';
import reducers from './redux/redusers';


export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunk = ThunkDispatch<RootStateType, unknown,userActionsAuthType | filesActionsType >

