import classes from './file.module.scss'
import folderLogo from '../../../../assets/images/folder.svg'
import fileLogo from '../../../../assets/images/file.svg'
import {IFolder } from '../../../../utils/types'


interface IFiles {
 file: IFolder
}
const FileDir: React.FC<IFiles> = ({ file }) => {
 const { name, created, size, type } = file
 
 return (
  <li className={classes.file}>
   <img src={type === 'dir' ? folderLogo : fileLogo} alt="item" className={classes.img} />
   <div className={classes.name}>{name}</div>
   <div className={classes.created}>{created.slice(0, 10)}</div>
   <div className={classes.size}>{size}</div>
  </li>
 )
}

export default FileDir