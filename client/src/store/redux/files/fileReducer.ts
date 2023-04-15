
import { CREATE_FOLDER, filesActionsType, IFiles, IFolder, SET_DIR, PUSH_TO_STACK, SET_FILES, SET_POPUP_DISPLAY, PUSH_ALL_DIRS } from "../../../utils/types"

export const defaultFilesState = {
  isLoading: false,
  files: [] as Array<IFolder>,
  currentDir: null as null | string,
  popupDisplay: false,
  dirStack: [] as Array<string | null>
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
    case PUSH_TO_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] }
      case PUSH_ALL_DIRS:
        return { ...state, dirStack:action.payload }
    default:
      return state
  }
}