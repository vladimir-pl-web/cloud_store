import { useActions } from "../../../../hooks/hooks";
import { IUploadedFile } from "../../../../utils/types";
import classes from './uploadFile.module.scss'
interface IUploader {
 file: IUploadedFile
}

const UploadFile: React.FC<IUploader> = ({ file }) => {
 const { removeUploadedFile } = useActions()
 return (
  <div className={classes.uploadFile}>
   <div className={classes.header}>
    <div>{file.name}</div>
    <button
     onClick={() => removeUploadedFile(file.id)}
    >X</button>
   </div>
   <div className={classes.progressBar}>
    <div className={classes.uploadBar}
     style={{ width: file.progress + "%" }}
    />
    <div className={classes.uploadPercent}>
     {file.progress}%
    </div>
   </div  >

  </div>
 );
};


export default UploadFile;