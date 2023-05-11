import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { IFolder } from "../../../utils/types";
import classes from "./fileList.module.scss";
import clsx from "clsx";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./fileList.module.scss";
import { ListGroup, ListGroupItem } from "reactstrap";
import ArrowBtns from "./arrowBtns/arrowBtbs";
import FileListItem from "./file/file";



const FileList = () => {
  //const [isElements, setIsElements] = useState<boolean>(true);
  const [anim, setAnim] = useState<boolean>(true);
  const ref = useRef(null)
  const { view } = useAppSelector(state => state.files)

  const headers = useMemo(() => {
    return [
      { id: 1, value: "Name", name: "name" },
      { id: 2, value: "Created", name: "date" },
      { id: 3, value: "Size", name: "size" },
      { id: 4, value: "Type", name: "type" },
    ];
  }, []);

  const fls = useAppSelector((state) => state.files.files);

  const hdrs = useMemo(() => {
    return headers.map((el: any) => {
      return <ListGroupItem
        color="info"
        key={el.id}
        className="justify-content-between"
      >{el.value}
        <ArrowBtns column={el.name} />

      </ListGroupItem>;
    });
  }, [headers]);

  const files = useMemo(() => {
    return (
      fls &&
      fls.map((file: IFolder) => {
        return (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={{ enterActive: classes["animEnterActive"] }}
            //exitActive:classes["fade-exit-active"]}
            exit={false}
          >
            <FileListItem file={file} setAnim={setAnim} />
          </CSSTransition>
        );
      })
    );
  }, [fls]);

  const listClasses = useMemo(() => {
    return clsx({
      [classes.list]: view === "list",
      [classes.listPlate]: view === "plate",
    });
  }, [classes.list, classes.listPlate, view]);

  return (
    <div className={classes.fileList}>
      { view === "list" && <ListGroup className={classes.header} horizontal>{hdrs}</ListGroup>} 
      <TransitionGroup component={"ul"} className={listClasses}>
        {files}
      </TransitionGroup>
    </div>
  );
};

export default FileList;
