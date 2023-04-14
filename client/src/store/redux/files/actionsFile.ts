import { Dispatch } from "redux";
import { createFile, getFiles } from "../../../api/api";
import { CREATE_FOLDER, IFolder, SET_DIR, SET_FILES, SET_POPUP_DISPLAY } from "../../../utils/types";
import { setLoading } from "../users/actionUsers";
import { defaultFilesState } from "./fileReducer";

export type IFiles = typeof defaultFilesState

export const setFiles = (payload: Array<IFolder>) => {
 return { type: SET_FILES, payload } as const
}

export const setDir = (payload: string ) => {
 return { type: SET_DIR, payload } as const
}

export const createDir = (payload: IFolder ) => {
  return { type: CREATE_FOLDER, payload } as const
}
 
export const setPopupDisplay = (payload: boolean) => {
  return { type: SET_POPUP_DISPLAY, payload } as const
 }

export const fetchAllFolders = (dirId: string | null) => async (dispatch: Dispatch)=> {

 dispatch(setLoading(true))
 try {
  const res = await getFiles(dirId)
  dispatch(setFiles((res.data.files)))
 }
 catch (e) {
  // if (axios.isAxiosError(e) && e.response) {
  //  dispatch(setUserError(e.response.data.message))
  //  localStorage.removeItem("token")
  // }
console.log(e, "errorFromFileReducer")
 }
 dispatch(setLoading(false))
}

export const fetchCreateFolder = (dirId: string | null, name: string) => async (dispatch: Dispatch)=> {

  dispatch(setLoading(true))
  try {
    const res = await createFile(dirId, name)
   dispatch(createDir(res.data))
  }
  catch (e) {
   // if (axios.isAxiosError(e) && e.response) {
   //  dispatch(setUserError(e.response.data.message))
   //  localStorage.removeItem("token")
   // }
 console.log(e, "errorFromFileReducer")
  }
  dispatch(setLoading(false))
 }