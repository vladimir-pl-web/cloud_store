import { AnyAction, Dispatch } from "redux";
import { IAuthData, SET_AUTH, SET_ERROR, SET_LOADING, userActionsAuthType } from "../../../utils/types";
import { defaultUserState } from "./userReducer";
import { sendAuthData } from '../../../api/api'
import { AppDispatch, AppThunk } from "../../store";
import axios from "axios";



export type IUsers = typeof defaultUserState

export const setLoading = (loading: boolean) => {
 return { type: SET_LOADING, loading } as const
}

export const setAuth = (payload: IAuthData) => {
 return { type: SET_AUTH, payload } as const
}

export const setUserError = (payload: string) => {
 return { type: SET_ERROR, payload } as const
}

export const fetchAuth = (data: IAuthData, type: string) => async (dispatch: Dispatch)=> {

 dispatch(setLoading(true))
 try {
  const res = await sendAuthData(data, type)
  if (res) {
   console.log(res, "authData")
  }
 }
 catch (e) {
  if (axios.isAxiosError(e) && e.response) {
   dispatch(setUserError(e.response.data.message))
  }

 }
 dispatch(setLoading(false))
}

