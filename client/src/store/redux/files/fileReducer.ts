import { CREATE_FOLDER, filesActionsType, IFiles, IFolder, SET_DIR, SET_FILES, SET_POPUP_DISPLAY } from "../../../utils/types"

export const defaultFilesState = {
  isLoading: false,
  files: [] as Array<IFolder>,
  currentDir: null as null | string,
  popupDisplay: false
}

export const fileReducer = (state = defaultFilesState, action: filesActionsType): IFiles => {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload }
    case SET_DIR:
      return { ...state, currentDir: action.payload }
    case CREATE_FOLDER:
      return { ...state, files: [...state.files, action.payload] }
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload }
    default:
      return state
  }
}