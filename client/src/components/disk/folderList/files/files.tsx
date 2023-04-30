import React, { useEffect, PropsWithChildren  } from "react";
import { TransitionGroup } from "react-transition-group";
import classes from './files.module.scss'

interface IList{
  isElements: boolean
  setIsElements: (status:boolean)=>void
}
const Files: React.FC<PropsWithChildren & IList> = ({ children, isElements, setIsElements }) => {
  const hasContent = Boolean(React.Children.toArray(children).length)
  useEffect(() => {
    if (!hasContent) {
      setIsElements(false)
    } else {
      setIsElements(true)
    }
  },[hasContent])
  
 return (
  <ul>
     {isElements ?
       children : 
       <li className={classes.msg}>
         There is an empty folder. You could upload files or create new directory
       </li>
       }
  </ul>
 )
}
export default Files