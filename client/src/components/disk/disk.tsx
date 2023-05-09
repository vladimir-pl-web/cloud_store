
import { ChangeEvent, useEffect, useState, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, FormGroup, Input, Label } from 'reactstrap';
import { useActions, useAppSelector } from '../../hooks/hooks';
import backLogo from '../../assets/images/back.svg'
import Loader from '../loader/loader';
import classes from './disk.module.scss'
import FolderList from './folderList/folderList';
import Popup from './popup/popup';
import SearchFile from './search/search';
import Uploader from './uploader/uploader';
import ViewFile from './viewFile/viewFile';

const Disk = () => {
   const navigate = useNavigate()
   const { fetchAllFolders, setPopupDisplay, pushAllDirs, setDir, fetchUploadFle } = useActions()
   const { currentDir, dirStack, sorts } = useAppSelector(state => state.files)
   const isLoading = useAppSelector(state => state.users.isLoading)
   const [dragEnter, setDragEnter] = useState<boolean>(false)

   useEffect(() => {
      navigate("/disk")
   }, [])

   useEffect(() => {
      fetchAllFolders(currentDir, sorts)
   }, [currentDir])

   const onCreate = () => {
      setPopupDisplay(true)
   }

   const onBackHandler = () => {
      let copyDirs = [...dirStack]
      const lastDir = copyDirs.pop()
      lastDir && setDir(lastDir)
      pushAllDirs(copyDirs)
      if (!dirStack.length || !lastDir) setDir(null)
   }

   const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
      //@ts-ignore
      const files = [...e.target.files]

      if (files?.length) {
         for (let i = 0; i < files.length; i++) {
            fetchUploadFle(currentDir, files[i], files[i].name)
         }
      }
   }

   const onDragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(true)
   }
   const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragEnter(false)
   }
   const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      let files = [...e.dataTransfer.files]
      if (files?.length) {
         for (let i = 0; i < files.length; i++) {
            fetchUploadFle(currentDir, files[i], files[i].name)
         }
      }
      setDragEnter(false)
   }
   return (
      !dragEnter ? <div
         className={classes.disk}
         onDragEnter={(e) => onDragEnterHandler(e)}
         onDragLeave={(e) => onDragLeaveHandler(e)}
         onDragOver={(e) => onDragEnterHandler(e)}
      >
         {!isLoading &&
            <div className={classes.btns}>
               <div className={classes.mainGroup}>
                  {dirStack.length ? <Button
                     color="info"
                     outline
                     className={classes.back}
                     onClick={() => onBackHandler()}>
                     <img src={backLogo} alt="backLogo" />
                  </Button> : ""}
                  <Button
                     color="info"
                     outline
                     onClick={onCreate}
                     className={classes.create}
                  >Create Folder</Button>
                  <Button
                     color="info"
                     outline
                     className={classes.upload}>
                     <label htmlFor="upload_input" className={classes.label}></label>
                     <input multiple={true} onChange={(e) => onFileUpload(e)} type="file" id="upload_input" />
                     Upload File
                  </Button>
                  <SearchFile />
               </div>
               <ViewFile />
            </div>}
         {isLoading ? <Loader /> : <FolderList />}
         <Popup />
         <Uploader />

      </div > :
         <div
            className={classes.drag}
            onDragEnter={(e) => onDragEnterHandler(e)}
            onDragLeave={(e) => onDragLeaveHandler(e)}
            onDragOver={(e) => onDragEnterHandler(e)}
            onDrop={(e) => onDropHandler(e)}
         >
            Drop Your Files Here
         </div>
   )
}

export default Disk