import { createDir, setDir, setFiles, setPopupDisplay } from "../store/redux/files/actionsFile";
import { defaultFilesState } from "../store/redux/files/fileReducer";
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

////files
export const SET_FILES = "SET_FILES"
export const SET_DIR = "SET_DIR"
export const CREATE_FOLDER = "CREATE_FOLDER"
export const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"

export type IFiles = typeof defaultFilesState

export type setFilesType = ReturnType<typeof setFiles>
export type setDirType = ReturnType<typeof setDir>
export type setPopupDisplayType = ReturnType<typeof setPopupDisplay>
export type setCreateFolderType = ReturnType<typeof createDir>
export type filesActionsType = setFilesType | setDirType | setLoadingType | setCreateFolderType | setPopupDisplayType
export interface IFolder{
 name: string
 type: string
 size: number
 path: string
 created: string
 user: string
 childs: Array<string>
 _id: string
}