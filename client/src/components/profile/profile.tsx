import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import classes from "./profile.module.scss";
import { Button, FormGroup } from "reactstrap";
import UploadButton from "../disk/buttons/uploadButton";
import { useActions, useAppSelector } from "../../hooks/hooks";
import Loader from "../loader/loader";
import { IUser } from "../../utils/types";


interface IProfile{
  onAvatarUpload:(event:ChangeEvent<HTMLInputElement>)=>void
}
const Profile: FC<IProfile> = ({ onAvatarUpload}) => {
  const{fetchDeleteAvatar}=useActions()
  const onDeleteAvatar = () => {

    fetchDeleteAvatar();
  };

  return (
  <div className={classes.profile}>
      <div className={classes.change}>
        <FormGroup>
          <UploadButton title={"Upload Avatar"} onFileUpload={ onAvatarUpload} />
        </FormGroup>
      </div>
      <div className={classes.delete}>
        <Button outline color={"danger"} onClick={onDeleteAvatar}>
          Delete Avatar
        </Button>
      </div>
    </div> 

  );
};

export default Profile;
