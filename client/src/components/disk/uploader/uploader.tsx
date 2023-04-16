import { useActions, useAppSelector } from '../../../hooks/hooks';
import classes from './uploader.module.scss'
import UploadFile from './uploadFile/uploadFile';

const Uploader = () => {
 const { files, showUploader} = useAppSelector(state => state.uploader)
 const { setUploader } = useActions()
 const onUpload = () => {
  setUploader(false)
 }

 return (
  showUploader ? 
  <div className={classes.uploader}>
   <div className={classes.header}>
    <div className={classes.title}>Downloads</div>
    <button className={classes.close} onClick={onUpload}
    >X</button>
   </div>
   {files.map(file =><UploadFile key={file.id} file={file} />
   )}
  </div> : null
 );
};

export default Uploader;