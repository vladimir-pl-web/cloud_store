import { setAuth, setData, setLoading, setLogout, setUserError } from "../store/redux/users/actionUsers";

////users - auth
export const SET_LOADING = "SET_LOADING";
export const SET_AUTH = "SET_AUTH";
export const SET_ERROR = "SET_ERROR"
export const SET_LOGOUT = "SET_LOGOUT"
export const SET_DATA = "SET_DATA"
export interface IAuthData {
email: string
password: string
}

export interface IUser {
 email: string
 id: string
 diskSpace: number
 usedSpace: number
 files: Array<string>
 }

export type setLoadingType = ReturnType<typeof setLoading>
export type setAuthType = ReturnType<typeof setAuth>
export type setLogoutType = ReturnType<typeof setLogout>
export type setDataType = ReturnType<typeof setData>
export type setErrorType = ReturnType<typeof setUserError>
export type userActionsAuthType = setLoadingType | setAuthType | setErrorType | setLogoutType | setDataType