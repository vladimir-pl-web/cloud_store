

import { defaultFilesState } from "../store/redux/files/fileReducer";
import { defaultUploaderState } from "../store/redux/upload/uploadReducer";
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
 avatar:string
 files: Array<string>
}

export interface setLoadingType {
 type: typeof SET_LOADING
 payload: boolean
}

export interface setAuthType {
 type: typeof SET_AUTH
 payload: boolean
}
export interface setLogoutType {
 type: typeof SET_LOGOUT
}
export interface setDataType {
 type: typeof SET_DATA
 payload: IUser
}
export interface setErrorType {
 type: typeof SET_ERROR
 payload: string
}
export type userActionsAuthType = setLoadingType | setAuthType | setErrorType | setLogoutType | setDataType | setAvatarLoadingType

////files
export const SET_FILES = "SET_FILES"
export const SET_DIR = "SET_DIR"
export const ADD_FILE = "ADD_FILE"
export const DELETE_FILE = "DELETE_FILE"
export const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY"
export const PUSH_TO_STACK = "PUSH_TO_STACK"
export const PUSH_ALL_DIRS = "PUSH_ALL_DIRS"
export const POP_FROM_STACK = "POP_FROM_STACK"
export const HANDLE_MESSAGE = "HANDLE_MESSAGE"
export const SET_SORT = "SET_SORT"
export const SET_VIEW = "SET_VIEW"


export type IFiles = typeof defaultFilesState
export type IMessage = { status: string, text: string }
export type IColumn = "name" | "date" | "type" | "size"
export type IView = "list" | "plate"
export type ISort = {
 sort: string
 dir: 1 | -1
}

export interface setFilesType {
 type: typeof SET_FILES
 payload: Array<IFolder>
}
export interface setViewType {
 type: typeof SET_VIEW
 payload: IView
}
export interface setPushAllDirs {
 type: typeof PUSH_ALL_DIRS
 payload: Array<string | null>
}
export interface setDirType {
 type: typeof SET_DIR
 payload: string | null
}
export interface setPopupDisplayType {
 type: typeof SET_POPUP_DISPLAY
 payload: boolean
}

export interface setCreateFolderType {
 type: typeof ADD_FILE,
 payload: IFolder
}
export interface setHandleMessage {
 type: typeof HANDLE_MESSAGE,
 payload: IMessage
}
export interface setDeleteFileType {
 type: typeof DELETE_FILE,
 payload: string
}
export interface setPushToStack {
 type: typeof PUSH_TO_STACK
 payload: string | null
}

export interface setSortType {
 type: typeof SET_SORT
 payload: ISort
}

export type filesActionsType = setFilesType | setDirType | setPushToStack | setLoadingType | setCreateFolderType | setPopupDisplayType | setPushAllDirs | setHandleMessage | setDeleteFileType | setSortType | setViewType
export interface IFolder {
 name: string
 type: string
 size: number
 path: string
 created: string
 user: string
 childs: Array<string>
 _id: string
}

////uploader

export type IUploader = typeof defaultUploaderState

export interface IAvaUploader{
    data:{
        user: IUser;
        message:string
    }
}

export const SET_UPLOADER = "SET_UPLOADER"
export const ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE"
export const REMOVE_UPLOAD_FILE = "REMOVE_UPLOAD_FILE"
export const CHANGE_UPLOAD_FILE = "CHANGE_UPLOAD_FILE"
export const SET_AVATAR_LOADING = "SET_AVATAR_LOADING";

export interface IUploadedFile{
 id: string
 name: string
 progress: number
}

export interface setUploaderType {
 type: typeof SET_UPLOADER
 payload:boolean
}

export interface setAvatarLoadingType {
    type: typeof SET_AVATAR_LOADING
    payload: boolean
   }

export interface setAddFileType {
 type: typeof ADD_UPLOAD_FILE
 payload: IUploadedFile
}
export interface setRemoveFileType {
 type: typeof REMOVE_UPLOAD_FILE
 payload: string
}
export interface setChangeFileType {
 type: typeof CHANGE_UPLOAD_FILE
 payload: {id: string, progress: number}
}
export type uploaderActionsType = setUploaderType | setAddFileType | setRemoveFileType |setChangeFileType | setAvatarLoadingType 


