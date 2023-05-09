import { Button, Tooltip } from 'reactstrap'
import classes from './viewFile.module.scss'
import listLogo from '../../../assets/images/list.svg'
import plateLogo from '../../../assets/images/plate.svg'
import { useState } from 'react'
import { useActions } from '../../../hooks/hooks'
import { IView } from '../../../utils/types'


const ViewFile = () => {
 const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
 const toggle = () => setTooltipOpen(!tooltipOpen);
 const [tooltipMsg, setTooltipMsg] = useState<string>("List")
 const { setView } = useActions()

 const onViewSet = (view: IView)=>{
 setView(view)
 }
 return (
  <div
   className={classes.wrapper}
   id={'Tooltip-1'}>
   <Button
   color="info"
    outline
    onMouseEnter={()=>setTooltipMsg("List")}
    onClick={()=>onViewSet("list")}
   >
    <img src={listLogo} alt="listLogo" />
   </Button>

   <Button
   color="info"
    outline
    onMouseEnter={()=>setTooltipMsg("Plate")}
    onClick={()=>onViewSet("plate")}
   >
    <img src={plateLogo} alt="plateLogo" />
   </Button>
   <Tooltip
    placement='top'
    isOpen={tooltipOpen}
    target={'Tooltip-1'}
    toggle={toggle}
   >
    {tooltipMsg} view
   </Tooltip>

  </div>
 )
}

export default ViewFile