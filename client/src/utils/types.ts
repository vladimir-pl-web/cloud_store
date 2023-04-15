
import { createDir, setDir, setFiles, setPopupDisplay } from "../store/redux/files/actionsFile";
import { defaultFilesState } from "../store/redux/files/fileReducer";

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

export interface setLoadingType{
 type: typeof SET_LOADING
 payload: boolean
}
export interface setAuthType{
 type: typeof SET_AUTH
 payload: boolean
}
export interface setLogoutType{
 type: typeof SET_LOGOUT
}
export interface setDataType{
 type: typeof SET_DATA
 payload: IUser
}
export interface setErrorType {
 type: typeof SET_ERROR
 payload: string
}
export type userActionsAuthType = setLoadingType | setAuthType | setErrorType | setLogoutType | setDataType

////files
export const SET_FILES = "SET_FILES"
export const SET_DIR = "SET_DIR"
export const CREATE_FOLDER = "CREATE_FOLDER"
export const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"

export type IFiles = typeof defaultFilesState

export interface setFilesType{
 type: typeof SET_FILES
 payload: Array<IFolder>
}
export interface setDirType{
 type: typeof SET_DIR
 payload: string
}
export interface setPopupDisplayType{
 type: typeof SET_POPUP_DISPLAY
 payload: boolean
}

export interface setCreateFolderType{
 type: typeof CREATE_FOLDER,
 payload: IFolder
}
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