import { IUser, SET_AUTH, SET_DATA, SET_ERROR, SET_LOADING, SET_LOGOUT, userActionsAuthType } from "../../../utils/types"
import { IUsers } from "./actionUsers"

export const defaultUserState = {
  isAuth: false,
  isLoading: false,
  data: {} as IUser,
  errorMessage: "",
}

export const userReducer = (state = defaultUserState, action: userActionsAuthType): IUsers => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload }
    case SET_AUTH:
      return { ...state, isAuth: action.payload }
    case SET_ERROR:
      return { ...state, errorMessage: action.payload }
      case SET_DATA:
        return { ...state, data: {...action.payload}}
    case SET_LOGOUT:
      localStorage.removeItem('token')
        return{...state, isAuth: false}
    default:
      return state
  }
}