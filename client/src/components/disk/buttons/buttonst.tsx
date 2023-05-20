import { Button } from 'reactstrap'
import classes from './buttons.module.scss'
import backLogo from '../../../assets/images/back.svg'
import { ChangeEvent } from 'react';
import UploadButton from './uploadButton';

interface IButtons {
 isLength: boolean;
 onBackHandler: () => void
 onCreate: () => void
 onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}
const Buttons: React.FC<IButtons> = ({ isLength, onBackHandler, onCreate, onFileUpload }) => {

 return (
  <div className={classes.btns}>
   {isLength ? <Button
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
    <UploadButton title={'Upload File'} onFileUpload={onFileUpload}/>
  </div>
 )
}
export default Buttons