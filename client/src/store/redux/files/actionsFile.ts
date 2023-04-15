import { Dispatch } from "redux";
import { createFile, getFiles } from "../../../api/api";
import { CREATE_FOLDER, IFolder, setCreateFolderType, setDirType, setFilesType, setPopupDisplayType, SET_DIR, SET_FILES, SET_POPUP_DISPLAY } from "../../../utils/types";
import { setLoading } from "../users/actionUsers";

export const setFiles = (payload: Array<IFolder>):setFilesType => {
 return { type: SET_FILES, payload }
}

export const setDir = (payload: string ):setDirType => {
 return { type: SET_DIR, payload }
}

export const createDir = (payload: IFolder ):setCreateFolderType => {
  return { type: CREATE_FOLDER, payload }
}
 
export const setPopupDisplay = (payload: boolean):setPopupDisplayType => {
  return { type: SET_POPUP_DISPLAY, payload }
 }

export const fetchAllFolders = (dirId: string | null)=>  async(dispatch:Dispatch)=> {

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

export const fetchCreateFolder = (dirId: string | null, name: string) => async (dispatch:Dispatch)=> {

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