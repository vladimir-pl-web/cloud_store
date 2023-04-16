import { useMemo, useState } from 'react'
import { useAppSelector } from '../../../hooks/hooks'
import {IFolder } from '../../../utils/types'
import FileDir from './file/file'
import classes from './fileList.module.scss'
import Files from './files/files'


const FileList = () => {
const[isElements,setIsElements] = useState<boolean>(true)
 const headers = [
  { id: 1, value: "Name" },
  { id: 2, value: "Created" },
  {id: 3, value: "Size"},
  ]
  
const fls = useAppSelector(state => state.files.files)

 const hdrs = useMemo(() => {
  return headers.map(({ id, value }) => {
   return (
    <li key={id}>{value}</li>
   )
  })
 }, [headers])
  
  const files = useMemo(() => {
    return (
     fls && fls.map((file: IFolder) => {
        return (
          <FileDir key={file._id} file={file} />
        )
      })
    )
  },[fls])
  
  
 return (
  <div className={classes.fileList}>
     {isElements && <ul className={classes.header}>
       {hdrs}
     </ul>} 
     <Files isElements={isElements} setIsElements={setIsElements}>
       {files}
     </Files>
  </div>
 )
}

export default FileList