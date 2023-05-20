import axios from "axios";
import { Dispatch } from "redux";
import { authInitial, sendAuthData } from '../../../api/api';
import { IAuthData, SET_AUTH, SET_AVATAR_LOADING, SET_ERROR, SET_LOADING, SET_LOGOUT, setAvatarLoadingType } from "../../../utils/types";
import { IUser, setAuthType, setDataType, setErrorType, setLoadingType, setLogoutType, SET_DATA } from './../../../utils/types';
import { defaultUserState } from "./userReducer";



export type IUsers = typeof defaultUserState

export const setLoading= (loading: boolean):setLoadingType  => {
 return { type: SET_LOADING, payload:loading }
}

export const setAuth = (payload: boolean):setAuthType => {
 return { type: SET_AUTH, payload }
}

export const setData = (payload: IUser):setDataType => {
    console.log(payload, "payload")
 return { type: SET_DATA, payload }
}

export const setUserError = (payload: string):setErrorType => {
 return { type: SET_ERROR, payload } 
}

export const setLogout = ():setLogoutType => {
 return { type: SET_LOGOUT } 
}

export const fetchAuth = (data: IAuthData, type: string) => async (dispatch:Dispatch)=> {

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

export const fetchInitAuth = () => async (dispatch:Dispatch)=> {

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

