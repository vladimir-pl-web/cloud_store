import { ChangeEvent } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'
import { useAppSelector } from '../../hooks/hooks';
import { IView } from '../../utils/types';
import Buttons from '../disk/buttons/buttonst';
import { IDisk } from '../disk/disk';
import SearchFile from '../disk/search/search';
import ViewFile from '../disk/viewFile/viewFile';
import PlateViewSort from '../plateViewSort/plateViewSort';
import classes from './sidebar.module.scss'

interface ISide extends IDisk {
  isLength: boolean;
  onBackHandler: () => void
  onCreate: () => void
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}
const Sidebar: React.FC<ISide> = ({ openSide, setOpenSide, isLength, onBackHandler, onCreate, onFileUpload }) => {
  const { view } = useAppSelector(state => state.files)
  return (
      <Offcanvas
        backdrop={false}
        toggle={() => setOpenSide(!openSide)}
        isOpen={openSide}
        className={classes.sidebar}
      >
      <OffcanvasHeader
        className={classes.header}
        toggle={() => setOpenSide(!openSide)}>
          Menu
        </OffcanvasHeader>
        <OffcanvasBody className={classes.body}>
          <ListGroup flush>
            <ListGroupItem
            >
              <ViewFile />
            </ListGroupItem>
            <ListGroupItem

            >
              <Buttons isLength={isLength} onCreate={onCreate} onBackHandler={onBackHandler} onFileUpload={onFileUpload} />

            </ListGroupItem>
            <ListGroupItem

            >
              <SearchFile />
            </ListGroupItem>
            <ListGroupItem
            >
              {view === "plate" && <PlateViewSort />}
            </ListGroupItem>
          </ListGroup>
        </OffcanvasBody>
      </Offcanvas>
  )
}
export default Sidebar