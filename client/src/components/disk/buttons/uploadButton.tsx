import { ChangeEvent, FC } from 'react'
import classes from './buttons.module.scss'
import { Button } from 'reactstrap';

interface IUploadButton{
    title:string;
    onFileUpload?: (e: ChangeEvent<HTMLInputElement>) => void
}
const UploadButton:FC<IUploadButton> = ({title, onFileUpload})=>{
    return(
        <Button
        color="info"
        outline
        className={classes.upload}>
        <label htmlFor="upload_input" className={classes.label}>{title}</label>
    
        <input multiple={true} style={{ display: "none" }} onChange={(e) => onFileUpload && onFileUpload(e)} type="file" id="upload_input" />
       </Button>
    )
}
export default UploadButton