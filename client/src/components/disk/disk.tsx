
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions, useAppSelector } from '../../hooks/hooks';
import Loader from '../loader/loader';
import classes from './disk.module.scss'
import FolderList from './folderList/folderList';
import Popup from './popup/popup';

const Disk = () => {
 const navigate = useNavigate()
 const{fetchAllFolders,setPopupDisplay, pushAllDirs,setDir}=useActions()
 const {currentDir,dirStack } = useAppSelector(state => state.files)
 const isLoading = useAppSelector(state => state.users.isLoading)



 useEffect(() => {
  navigate("/disk")
 }, [])

 useEffect(() => {
  fetchAllFolders(currentDir)
 }, [currentDir])

 const onCreate = () => {
  setPopupDisplay(true)
 }

 const onBackHandler = () => {
  let copyDirs = [...dirStack]
  const lastDir = copyDirs.pop()
  lastDir && setDir(lastDir)
  pushAllDirs(copyDirs)
  if (!dirStack.length || !lastDir)  setDir(null)
 }
 return (
  <div className={classes.disk}>
   { !isLoading && <div className={classes.btns}>
    {dirStack.length ? <button className={classes.back} onClick={() => onBackHandler()}>Back</button> : ""} 
    <button  onClick={onCreate} className={classes.create}>Create</button>
   </div>}
   {isLoading ? <Loader /> : <FolderList />}
   <Popup />
  </div>
 )
}

export default Disk