import { ADD_UPLOAD_FILE, CHANGE_UPLOAD_FILE, IUploadedFile, IUploader, REMOVE_UPLOAD_FILE, SET_AVATAR_LOADING, SET_UPLOADER, uploaderActionsType } from "../../../utils/types"

export const defaultUploaderState = {
 showUploader: false,
 isAvatarLoading:false,
 files: [] as Array<IUploadedFile>
}

export const uploaderReducer = (state: IUploader = defaultUploaderState , action: uploaderActionsType):IUploader => {
 switch (action.type) {
  case SET_UPLOADER:
   return { ...state, showUploader: action.payload }
   case ADD_UPLOAD_FILE:
   return { ...state, files: [...state.files, action.payload] }
   case SET_AVATAR_LOADING:
    return{...state, isAvatarLoading:action.payload}
   case REMOVE_UPLOAD_FILE:
   return { ...state, files: [...state.files.filter((el) => el.id !== action.payload)] }
   case CHANGE_UPLOAD_FILE:
   return {
    ...state,
    files: [...state.files.map((el) => el.id === action.payload.id
     ? { ...el, progress: action.payload.progress }
     : { ...el }
    )] }
   default:
     return state
 }
}