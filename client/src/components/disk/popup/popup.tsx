import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { createDir, fetchCreateFolder, setPopupDisplay } from "../../../store/redux/files/actionsFile";
import Input from "../../auth/input/input";
import classes from './popup.module.scss'


const Popup = () => {
 const [dirName, setDirName] = useState('')
 const popupDisplay = useAppSelector(state => state.files.popupDisplay)
 const currentDir = useAppSelector(state => state.files.currentDir)
 const dispatch = useAppDispatch()
 const cls = [
  classes.popup
 ]
 if (popupDisplay) {
  cls.push(classes.none)
 }
 function setName(e: ChangeEvent<HTMLInputElement>) {
  setDirName(e.currentTarget.value)
 }

 function createHandler() {
  if (!dirName) return
  dispatch(fetchCreateFolder(currentDir, dirName.trim()))
  dispatch(setPopupDisplay(false))
  setDirName("")
 }

 return (
  <div className={cls.join(" ")} onClick={() => dispatch(setPopupDisplay(false))}>
   <div className={classes.content} onClick={(e => e.stopPropagation())}>
    <div className={classes.header}>
     <div className={classes.title}>Create New Folder</div>
     <button className={classes.close} onClick={() => dispatch(setPopupDisplay(false))}>X</button>
    </div>
    <Input type="text" placeholder="Enter folder name..." value={dirName} onChange={(e) => setName(e)} />
    <button className={classes.create} onClick={() => createHandler()}>Create</button>
   </div>
  </div>
 );
};

export default Popup;