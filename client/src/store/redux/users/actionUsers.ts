import { IUser, SET_DATA } from './../../../utils/types';
import { AnyAction, Dispatch } from "redux";
import { IAuthData, SET_AUTH, SET_ERROR, SET_LOADING, SET_LOGOUT, userActionsAuthType } from "../../../utils/types";
import { defaultUserState } from "./userReducer";
import { authInitial, sendAuthData } from '../../../api/api'
import { AppDispatch, AppThunk } from "../../store";
import axios from "axios";



export type IUsers = typeof defaultUserState

export const setLoading = (loading: boolean) => {
 return { type: SET_LOADING, loading } as const
}

export const setAuth = (payload: boolean) => {
 return { type: SET_AUTH, payload } as const
}

export const setData = (payload: IUser) => {
 return { type: SET_DATA, payload } as const
}

export const setUserError = (payload: string) => {
 return { type: SET_ERROR, payload } as const
}

export const setLogout = () => {
 return { type: SET_LOGOUT } as const
}

export const fetchAuth = (data: IAuthData, type: string) => async (dispatch: Dispatch)=> {

 dispatch(setLoading(true))
 try {
  const res = await sendAuthData(data, type)
  if (res) {
   const{data}=res
   localStorage.setItem('token', data.token)
   dispatch(setAuth(true))
   dispatch(setData(data.user_data))
  }
 }
 catch (e) {
  if (axios.isAxiosError(e) && e.response) {
   dispatch(setUserError(e.response.data.message))
  }

 }
 dispatch(setLoading(false))
}

export const fetchInitAuth = () => async (dispatch: Dispatch)=> {

 dispatch(setLoading(true))
 try {
  const res = await authInitial()
  if (res) {
   const{data}=res
   dispatch(setAuth(true))
   dispatch(setData(data.user_data))
  }
 }
 catch (e) {
  if (axios.isAxiosError(e) && e.response) {
   dispatch(setUserError(e.response.data.message))
   localStorage.removeItem("token")
  }

 }
 dispatch(setLoading(false))
}

