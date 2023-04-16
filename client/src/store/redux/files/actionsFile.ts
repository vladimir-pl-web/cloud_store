import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from "redux";
import { createFolder, creds, getFiles, instance,} from "../../../api/api";
import { ADD_FILE, IFolder, setPushToStack, PUSH_TO_STACK, setCreateFolderType, setDirType, setFilesType, setPopupDisplayType, SET_DIR, SET_FILES, SET_POPUP_DISPLAY, PUSH_ALL_DIRS, setPushAllDirs } from "../../../utils/types";
import { setUploader,addUploadedFile, changeUploadedFile } from "../upload/uploaderActions";
import { setLoading } from "../users/actionUsers";

export const setFiles = (payload: Array<IFolder>):setFilesType => {
 return { type: SET_FILES, payload }
}

export const setDir = (payload: string | null ):setDirType => {
 return { type: SET_DIR, payload }
}

export const addFile = (payload: IFolder ):setCreateFolderType => {
  return { type: ADD_FILE, payload }
}

export const setPopupDisplay = (payload: boolean):setPopupDisplayType => {
  return { type: SET_POPUP_DISPLAY, payload }
}
export const pushToStack = (payload: string | null):setPushToStack => {
  return { type: PUSH_TO_STACK, payload }
}

export const pushAllDirs = (payload: Array<string | null>):setPushAllDirs => {
  return { type: PUSH_ALL_DIRS, payload }
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
    const res = await createFolder(dirId, name)
   dispatch(addFile(res.data))
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

export const fetchUploadFle = (dirId: string | null, file: Blob, name:string) => async (dispatch: Dispatch) => {

  dispatch(setUploader(true))
  try {
    const formData = new FormData()
    formData.append("file", file)
    if (dirId) {
      formData.append('parent', dirId)
    }
    const uploadedFile = {
      name,
      progress: 0,
      id: uuidv4()
    }
    dispatch(addUploadedFile(uploadedFile))
    // const res = await uploadFile(formData, uploadedFile, dispatch)
    const res = await instance.post(`files/upload`, formData, {
      headers: { ...creds.headers },
      onUploadProgress: progressEvent => {
       const percentCompleted = progressEvent.total ? (progressEvent.loaded / progressEvent.total) * 100 : 0
       dispatch(changeUploadedFile({id: uploadedFile.id, progress: +percentCompleted.toFixed()}))
      }
     })
    console.log(res, "res");
    dispatch(addFile(res.data))
    
  }
  catch (e) {
   // if (axios.isAxiosError(e) && e.response) {
   //  dispatch(setUserError(e.response.data.message))
   //  localStorage.removeItem("token")
   // }
 console.log(e, "errorFromFileReducer")
  }
  dispatch(setUploader(false))
 }