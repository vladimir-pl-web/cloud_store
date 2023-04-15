
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions, useAppSelector } from '../../hooks/hooks';
import Loader from '../loader/loader';
import classes from './disk.module.scss'
import FolderList from './folderList/folderList';
import Popup from './popup/popup';

const Disk = () => {
 const navigate = useNavigate()
 const{fetchAllFolders,setPopupDisplay,}=useActions()
 const dir = useAppSelector(state => state.files.currentDir)
 const isLoading = useAppSelector(state => state.users.isLoading)



 useEffect(() => {
  navigate("/disk")
 }, [])

 useEffect(() => {
  fetchAllFolders(dir)
 }, [dir])

 const onCreate = () => {
  setPopupDisplay(true)
 }
 return (
  <div className={classes.disk}>
   <div className={classes.btns}>
    <button disabled = {isLoading} className={classes.back}>Back</button>
    <button disabled={isLoading} onClick={ onCreate} className={classes.create}>Create</button>
   </div>
   {isLoading ? <Loader /> : <FolderList />}
   <Popup />
  </div>
 )
}

export default Disk