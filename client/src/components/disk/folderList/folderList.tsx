import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { IFolder } from "../../../utils/types";
import FileDir from "./file/file";
import classes from "./fileList.module.scss";
import Files from "./files/files";
import { CSSTransition, Transition, TransitionGroup } from "react-transition-group";
import "./fileList.module.scss";
import { Badge, ListGroup, ListGroupItem } from "reactstrap";
import ArrowBtns from "./arrowBtns/arrowBtbs";



const FileList = () => {
  //const [isElements, setIsElements] = useState<boolean>(true);
  const [anim, setAnim] = useState<boolean>(true);
  const ref = useRef(null)

  useEffect(() => {
    console.log("initRender")
  }, []);
  
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
    return headers.map((el:any ) => {
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
            timeout={5000}
            classNames={{ enterActive: classes["animEnterActive"] }}
            //exitActive:classes["fade-exit-active"]}
            exit={false}
          >
            <FileDir file={file} setAnim={setAnim} />
          </CSSTransition>
        );
      })
    );
  }, [fls]);

  return (
    <div className={classes.fileList}>
      <ListGroup  className={classes.header} horizontal>{hdrs}</ListGroup>
        <TransitionGroup component={"ul"}>
          {files}
        </TransitionGroup>
    </div>
  );
};

export default FileList;
