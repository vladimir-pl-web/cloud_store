import { ISort, SET_VIEW } from './../../../utils/types';

import { ADD_FILE, filesActionsType, IFiles, IFolder, SET_DIR, PUSH_TO_STACK, SET_FILES, SET_POPUP_DISPLAY, PUSH_ALL_DIRS, DELETE_FILE, HANDLE_MESSAGE, SET_SORT } from "../../../utils/types"

export const defaultFilesState = {
  isLoading: false,
  files: [] as Array<IFolder>,
  currentDir: null as null | string,
  popupDisplay: false,
  dirStack: [] as Array<string | null>,
  message: {
    status: "default",
    text: ""
  },
  sorts: {
    sort: "date",
    dir: 1
  } as ISort,
  view: "plate"
}

export const fileReducer = (state = defaultFilesState, action: filesActionsType): IFiles => {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload }
    case SET_DIR:
      return { ...state, currentDir: action.payload }
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] }
      case DELETE_FILE:
        return { ...state, files: [...state.files.filter((el)=>el._id !== action.payload)] }
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload }
    case PUSH_TO_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] }
      case PUSH_ALL_DIRS:
      return { ...state, dirStack: action.payload }
    case HANDLE_MESSAGE:
      return { ...state, message: { ...action.payload } }
    case SET_SORT:
      return { ...state, sorts: { ...action.payload } }
      case SET_VIEW:
        return { ...state, view:action.payload   }
    default:
      return state
  }
}