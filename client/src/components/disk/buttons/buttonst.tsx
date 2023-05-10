import { Button } from 'reactstrap'
import classes from './buttons.module.scss'
import backLogo from '../../../assets/images/back.svg'
import { ChangeEvent } from 'react';

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
   <Button
    color="info"
    outline
    className={classes.upload}>
    <label htmlFor="upload_input" className={classes.label}>Upload File</label>

    <input multiple={true} style={{ display: "none" }} onChange={(e) => onFileUpload(e)} type="file" id="upload_input" />
   </Button>
  </div>
 )
}
export default Buttons