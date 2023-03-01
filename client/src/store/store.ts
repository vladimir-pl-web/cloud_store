import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { fileReducer } from './redux/files/fileReducer'
import { userReducer } from './redux/users/userReducer'

const rootReducer = combineReducers({
 users: userReducer,
 files: fileReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

