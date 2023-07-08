import { ChangeEvent, useState, KeyboardEvent } from "react";
import { useActions, useAppSelector } from "../../../hooks/hooks";
import classes from "./popup.module.scss";
import { Button, Form, FormFeedback, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { registerRs } from "../../../utils/utils";
import { useForm } from "react-hook-form";
import { IFormData } from "../../../utils/types";

const Popup = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useAppSelector((state) => state.files.popupDisplay);
  const currentDir = useAppSelector((state) => state.files.currentDir);
  const { fetchCreateFolder, setPopupDisplay } = useActions();
  const cls = [classes.popup];
  if (popupDisplay) {
    cls.push(classes.none);
  }
  const setName = (e: ChangeEvent<HTMLInputElement>) => {
    setDirName(e.currentTarget.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>();

  const createHandler = () => {
    if (!dirName) return;
    fetchCreateFolder(currentDir, dirName.trim());
    setPopupDisplay(false);
    setDirName("");
  };

  
  const toggle = () => setPopupDisplay(!popupDisplay);

  const onKeyHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        return createHandler();
      case "Escape":
        return setDirName("");
      default:
        return "";
    }
  };

  return (

    <div onKeyDown={(e) => onKeyHandler(e)}>
    <Modal isOpen={popupDisplay} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Folder</ModalHeader>
      <Form onSubmit={handleSubmit(createHandler)}>
      <ModalBody>
      <FormGroup className={classes.group} >
        <Input
          {...registerRs ("name", {
            required: { value: true, message: "Folder name required" },
          },register)}
          placeholder="Enter folder name"
          invalid={errors.name ? true : false}
          onChange={(e) => setName(e)}
        />
        <FormFeedback 
        className={classes.errorMessage}
        tooltip>{errors.name?.message}</FormFeedback>
      </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => createHandler()}>
          Create
        </Button>{' '}
        
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
      </Form>
    </Modal>
  </div>
    // <div className={cls.join(" ")} onClick={() => setPopupDisplay(false)}>
    //   <div
    //     className={classes.content}
    //     onClick={(e) => e.stopPropagation()}
    //     onKeyDown={(e) => onKeyHandler(e)}
    //   >
    //     <div className={classes.header}>
    //       <div className={classes.title}>Create New Folder</div>
    //       <button
    //         className={classes.close}
    //         onClick={() => setPopupDisplay(false)}
    //       >
    //         X
    //       </button>
    //     </div>
    //     <Input
    //       type="text"
    //       placeholder="Enter folder name..."
    //       value={dirName}
    //       onChange={(e) => setName(e)}
    //     />
    //     <button className={classes.create} onClick={() => createHandler()}>
    //       Create
    //     </button>
    //   </div>
    // </div>
  );
};

export default Popup;
