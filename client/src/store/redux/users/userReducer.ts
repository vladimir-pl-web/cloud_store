import { SET_AUTH, SET_ERROR, SET_LOADING, userActionsAuthType } from "../../../utils/types"
import { IUsers } from "./actionUsers"

export const defaultUserState = {
  isAuth: false,
  isLoading: false,
  data: {},
  errorMessage: ""
}

export const userReducer = (state = defaultUserState, action: userActionsAuthType): IUsers => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.loading }
    case SET_AUTH:
      return { ...state, data: action.payload }
    case SET_ERROR:
      return{...state, errorMessage: action.payload}
    default:
      return state
  }
}