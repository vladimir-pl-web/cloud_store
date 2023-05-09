import classes from './file.module.scss'
import clsx from "clsx";
import folderLogo from '../../../../assets/images/folder.svg'
import fileLogo from '../../../../assets/images/file.svg'
import downloadLogo from '../../../../assets/images/download.svg'
import deleteLogo from '../../../../assets/images/delete.svg'
import { IFolder } from '../../../../utils/types'
import { useActions, useAppSelector } from '../../../../hooks/hooks'
import { useEffect, useMemo } from 'react';
import { Messages } from '../../../../utils/enums'
import { displayNotification, fileSize } from '../../../../utils/utils'
import { Link, useParams } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import { Button } from 'reactstrap';



interface IFiles {
  file: IFolder
  setAnim: (anim: boolean) => void
}
const FileListItem: React.FC<IFiles> = ({ file, setAnim }) => {
  const { setDir, fetchDeleteFle, pushToStack, fetchDownloadFle } = useActions()
  const { name, created, size, type, _id } = file
  const { currentDir, message, view } = useAppSelector(state => state.files)
  const { status, text } = message
  const { id } = useParams()
  const param = id ? "disk/:" : ""

  useEffect(() => {
    if (status !== Messages.C) displayNotification(text, status)
  }, [status])

  const onOpenFolder = () => {
    if (type !== "dir") return
    setAnim(true)
    setDir(_id)
    pushToStack(currentDir)
  }

  const onFileDownload = () => {
    fetchDownloadFle(_id, name)
  }

  const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    fetchDeleteFle(file)
  }

  const fileClasses = useMemo(() => {
    return clsx({
      [classes.file]: view === "list",
      [classes.filePlate]: view === "plate",
    });
  }, [classes.file, classes.filePlate, view]);

  const nameClasses = useMemo(() => {
    return clsx({
      [classes.name]: view === "list",
      [classes.namePlate]: view === "plate",
    });
  }, [classes.name, classes.namePlate, view]);

  const linkClasses = useMemo(() => {
    return clsx({
      [classes.link]: view === "list",
      [classes.linkPlate]: view === "plate",
    });
  }, [classes.link, classes.linkPlate, view]);

  const imgClasses = useMemo(() => {
    return clsx({
      [classes.img]: view === "list",
      [classes.imgPlate]: view === "plate",
    });
  }, [classes.img, classes.imgPlate, view]);

  const btnDownloadClasses = useMemo(() => {
    return clsx({
      [classes.btnDownload]: view === "list",
      [classes.btnDownloadPlate]: view === "plate",
    });
  }, [classes.btnDownload, classes.btnDownloadPlate, view]);

  const btnDeleteClasses = useMemo(() => {
    return clsx({
      [classes.btnDelete]: view === "list",
      [classes.btnDeletePlate]: view === "plate",
    });
  }, [classes.btnDelete, classes.btnDeletePlate, view]);

  const wrapClasses = useMemo(() => {
    return clsx({
      [classes.wrap]: view === "list",
      [classes.wrapPlate]: view === "plate",
    });
  }, [classes.wrap, classes.wrapPlate, view]);

  return (

    <li className={fileClasses} onClick={() => onOpenFolder()}>
      <Link to={`disk/:${name}/`} className={linkClasses} >
        <div className={classes.nameWrap}>
          <img src={type === 'dir' ? folderLogo : fileLogo} alt="item" className={imgClasses} />
          <div className={nameClasses}>{name}</div>
        </div>
        {view === "list" && <div className={classes.created}>{created.slice(0, 10)}</div>}
        {view === "list" && <div className={classes.size}>
          {fileSize(size)}
          <div className={wrapClasses}>
            {file.type !== 'dir' &&
              <Button
                color="info"
                outline
                className={btnDownloadClasses}
                onClick={onFileDownload}
              >
                <img src={downloadLogo} alt="downloadLogo" />
              </Button>}
            <Button
              color="danger"
              outline
              onClick={(e) => onDeleteHandler(e)}
              className={btnDeleteClasses}>
              <img src={deleteLogo} alt="deleteLogo" />
            </Button>
          </div>
        </div>}
        {view === "list" && <div className={classes.type}>{type}</div>}
        {view === "plate" && <div className={wrapClasses}>
          {file.type !== 'dir' &&
            <Button
              color="info"
              outline
              className={btnDownloadClasses}
              onClick={onFileDownload}
            >
              <img src={downloadLogo} alt="downloadLogo" />
            </Button>}
          <Button
            color="danger"
            outline
            onClick={(e) => onDeleteHandler(e)}
            className={btnDeleteClasses}>
            <img src={deleteLogo} alt="deleteLogo" />
          </Button>
        </div>}
      </Link>
    </li>
  )
}

export default FileListItem