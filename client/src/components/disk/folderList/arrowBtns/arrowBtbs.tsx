import { MouseEventHandler, useState } from 'react'
import { Tooltip } from 'reactstrap'
import { useActions, useAppSelector, useArrowCheck } from '../../../../hooks/hooks'

import { IColumn, ISort } from '../../../../utils/types'
import classes from './arrow.module.scss'

interface IArrow {
 column: IColumn
}
const ArrowBtns: React.FC<IArrow> = ({ column }) => {
 const { dir } = useArrowCheck(column)
 const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
 const toggle = () => setTooltipOpen(!tooltipOpen);
 const [msgColumn, setMsgColumn] = useState<string>("")
 const { setSort,  fetchAllFolders } = useActions()
 const { currentDir, sorts } = useAppSelector(state => state.files)

 const dirColorCheck = (d: 1 | -1) => {
  if (dir && dir === d) {
   return "#0492C2"
  } else {
   return "silver"
  }
 }
 const onSortHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation()
  const direction = e.currentTarget.getAttribute('data-dir')
  const col = e.currentTarget.getAttribute('data-column-btn')
  setMsgColumn(`Sort by ${col} to the ${direction}`)
  const dirNumber = direction === 'top' ? -1 : 1
  if (e.type === 'click' && col) {
   setSort({
    dir: dirNumber,
    sort: col 
   })
   fetchAllFolders(currentDir,sorts)
  }
}

 return (
  <div
   className={classes.wrapper}
   id={'Tooltip-' + "id"}>
   <div
    data-dir="top"
    data-column-btn={column}
    onMouseOver = {(e)=>onSortHandler(e)}
    onClick={(e) => onSortHandler(e)}
    onMouseLeave = {()=>setMsgColumn("")}
    className={classes.top}
    style={{ borderBottom: `9px solid ${dirColorCheck(-1)}` }}
   ></div>
   <div
    data-dir="bottom"
    data-column-btn={column}
    onMouseOver = {(e)=>onSortHandler(e)}
    onMouseLeave = {()=>setMsgColumn("")}
    onClick={(e)=>onSortHandler(e)}
    className={classes.bottom}
    style={{ borderTop: `9px solid ${dirColorCheck(1)}` }}
   ></div>
   <Tooltip
    placement='top'
    isOpen={tooltipOpen}
    target={'Tooltip-' + "id"}
    toggle={toggle}
   >
    {msgColumn}
   </Tooltip>
  </div>
 )
}

export default ArrowBtns