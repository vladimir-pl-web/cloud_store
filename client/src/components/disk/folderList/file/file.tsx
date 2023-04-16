import classes from './file.module.scss'
import folderLogo from '../../../../assets/images/folder.svg'
import fileLogo from '../../../../assets/images/file.svg'
import downloadLogo from '../../../../assets/images/download.svg'
import deleteLogo from '../../../../assets/images/delete.svg'
import { IFolder } from '../../../../utils/types'
import { useActions, useAppSelector } from '../../../../hooks/hooks'
import { useEffect } from 'react';
import { Messages } from '../../../../utils/enums'
import { displayNotification } from '../../../../utils/utils'



interface IFiles {
 file: IFolder
}
const FileDir: React.FC<IFiles> = ({ file }) => {
 const { setDir,fetchDeleteFle, pushToStack, fetchDownloadFle } = useActions()
 const { name, created, size, type, _id } = file
 const { currentDir, message } = useAppSelector(state => state.files)
 const { status, text } = message
 
 useEffect(() => {
  if(status !== Messages.C) displayNotification(text, status)
 },[status])
 
 const onOpenFolder = () => {
  if (type !== "dir") return
  setDir(_id)
  pushToStack(currentDir)
 }

 const onFileDownload = () => {
  fetchDownloadFle(_id, name)
 }

 const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.stopPropagation()
  fetchDeleteFle(file)
 }
 return (
  <li className={classes.file} onClick={() => onOpenFolder()}>
   <img src={type === 'dir' ? folderLogo : fileLogo} alt="item" className={classes.img} />
   <div className={classes.name}>{name}</div>
   {file.type !== 'dir' &&
    <button
     className={classes.btnDownload}
    onClick = {onFileDownload}
    >
     <img src={downloadLogo} />
    </button>}
   <button
    onClick={(e)=> onDeleteHandler(e)}
    className={classes.btnDelete}>
   <img src={deleteLogo} />
   </button>
   <div className={classes.created}>{created.slice(0, 10)}</div>
   <div className={classes.size}>{size}</div>

  </li>
 )
}

export default FileDir