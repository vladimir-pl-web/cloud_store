import classes from './file.module.scss'
import folderLogo from '../../../../assets/images/folder.svg'
import fileLogo from '../../../../assets/images/file.svg'
import { IFolder } from '../../../../utils/types'
import { useActions, useAppSelector } from '../../../../hooks/hooks'
import { setUserError } from '../../../../store/redux/users/actionUsers'



interface IFiles {
 file: IFolder
}
const FileDir: React.FC<IFiles> = ({ file }) => {
 const{setDir, pushToStack}=useActions()
 const { name, created, size, type, _id } = file
 const { currentDir } = useAppSelector(state => state.files)

 const onOpenFolder = () => {
  if(type !== "dir") return
  setDir(_id)
  pushToStack(currentDir)
 }
 return (
  <li className={classes.file} onClick={()=> onOpenFolder()}>
   <img src={type === 'dir' ? folderLogo : fileLogo} alt="item" className={classes.img} />
   <div className={classes.name}>{name}</div>
   <div className={classes.created}>{created.slice(0, 10)}</div>
   <div className={classes.size}>{size}</div>
  </li>
 )
}

export default FileDir