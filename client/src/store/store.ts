import { Action, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'
import { fileReducer } from './redux/files/fileReducer'
import { userReducer } from './redux/users/userReducer'

const rootReducer = combineReducers({
 users: userReducer,
 files: fileReducer
})

// export type RootState = ReturnType<typeof rootReducer>
// export type AppDispatch = typeof store.dispatch
// type rootReducerType = typeof rootReducer;
// export type RootStateType = ReturnType<rootReducerType>;
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  Action
>
const middlewares = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

