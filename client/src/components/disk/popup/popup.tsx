import { ChangeEvent, useState } from "react";
import { useActions, useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { fetchCreateFolder, setPopupDisplay } from "../../../store/redux/files/actionsFile";
import Input from "../../auth/input/input";
import classes from './popup.module.scss'


const Popup = () => {
 const [dirName, setDirName] = useState('')
 const popupDisplay = useAppSelector(state => state.files.popupDisplay)
 const currentDir = useAppSelector(state => state.files.currentDir)
 const{fetchCreateFolder,setPopupDisplay,}=useActions()
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
  fetchCreateFolder(currentDir, dirName.trim())
  setPopupDisplay(false)
  setDirName("")
 }

 return (
  <div className={cls.join(" ")} onClick={() => setPopupDisplay(false)}>
   <div className={classes.content} onClick={(e => e.stopPropagation())}>
    <div className={classes.header}>
     <div className={classes.title}>Create New Folder</div>
     <button className={classes.close} onClick={() => setPopupDisplay(false)}>X</button>
    </div>
    <Input type="text" placeholder="Enter folder name..." value={dirName} onChange={(e) => setName(e)} />
    <button className={classes.create} onClick={() => createHandler()}>Create</button>
   </div>
  </div>
 );
};

export default Popup;