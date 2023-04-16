import { useMemo } from 'react'
import { AppThunk } from './../store/store';
import { bindActionCreators } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../store/store";
import * as fileActions from '../store/redux/files/actionsFile'
import * as uploadActions from '../store/redux/upload/uploaderActions'
import * as userActions from '../store/redux/users/actionUsers'

const actions = {
 ...fileActions,
 ...userActions,
 ...uploadActions
}
export const useAppDispatch = () => useDispatch<AppThunk>()

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector

export const useActions = () => {
 const dispatch = useDispatch<AppThunk>()
    
 return useMemo(() => {
  return bindActionCreators(actions, dispatch)
 }, [dispatch])
}