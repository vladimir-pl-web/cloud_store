
import { ChangeEvent, useEffect, useState, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions, useAppSelector } from '../../hooks/hooks';
import Loader from '../loader/loader';
import classes from './disk.module.scss'
import FolderList from './folderList/folderList';
import Popup from './popup/popup';
import SearchFile from './search/search';
import Uploader from './uploader/uploader';
import ViewFile from './viewFile/viewFile';
import PlateViewSort from '../plateViewSort/plateViewSort';
import Sidebar from '../sidebar/sidebar';
import Buttons from './buttons/buttonst';
import { Button, FormGroup, Input, Label } from 'reactstrap';


export interface IDisk  {
   openSide: boolean;
   setOpenSide: (open: boolean) => void
}

const Disk: React.FC<IDisk> = ({ setOpenSide, openSide }) => {
   const navigate = useNavigate()
   const { fetchAllFolders, setPopupDisplay, pushAllDirs, setDir, fetchUploadFle } = useActions()
   const { currentDir, dirStack, sorts, view } = useAppSelector(state => state.files)
   const isLoading = useAppSelector(state => state.users.isLoading)
   const [dragEnter, setDragEnter] = useState<boolean>(false)
   const isLength = !!dirStack.length

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
                  <Buttons isLength={isLength} onCreate={onCreate} onBackHandler={onBackHandler} onFileUpload={onFileUpload} />
                  <SearchFile />
               </div>
               {view === "plate" && <PlateViewSort />}
               <ViewFile />
            </div>}
         {isLoading ? <Loader /> : <FolderList />}
         <Sidebar
            setOpenSide={setOpenSide}
            openSide={openSide}
            isLength={isLength}
            onCreate={onCreate}
            onBackHandler={onBackHandler}
            onFileUpload={onFileUpload}

         />
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