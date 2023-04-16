import { ADD_UPLOAD_FILE, CHANGE_UPLOAD_FILE, IUploadedFile, REMOVE_UPLOAD_FILE, setAddFileType, setChangeFileType, setRemoveFileType, setUploaderType, SET_UPLOADER } from './../../../utils/types';


export const setUploader = (payload: boolean): setUploaderType => {
 return {
  type: SET_UPLOADER,
  payload
 }
}

export const addUploadedFile = (payload: IUploadedFile): setAddFileType => {
 return {
  type: ADD_UPLOAD_FILE,
  payload
 }
}

export const removeUploadedFile = (payload: string): setRemoveFileType => {
 return {
  type: REMOVE_UPLOAD_FILE,
  payload
 }
}
export const changeUploadedFile = (payload: { id: string, progress: number }): setChangeFileType => {
 console.log(payload.progress, "progress")
 return {
  type: CHANGE_UPLOAD_FILE,
  payload
 }
}