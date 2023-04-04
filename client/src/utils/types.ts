import { setAuth, setLoading, setUserError } from "../store/redux/users/actionUsers";

////users - auth
export const SET_LOADING = "SET_LOADING";
export const SET_AUTH = "SET_AUTH";
export const SET_ERROR = "SET_ERROR"

export interface IAuthData {
email: string
password: string
}

export type setLoadingType = ReturnType<typeof setLoading>
export type setAuthType = ReturnType<typeof setAuth>
export type setErrorType = ReturnType<typeof setUserError>
export type userActionsAuthType = setLoadingType | setAuthType | setErrorType