
import { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useActions, useAppSelector } from '../../hooks/hooks';
import { ISort } from '../../utils/types';
import classes from './plateViewSort.module.scss'


const PlateViewSort = () => {
 const [dropdownOpen, setDropdownOpen] = useState(false);
 const toggle = () => setDropdownOpen((prevState) => !prevState);
 const { currentDir } = useAppSelector(state => state.files)
 const { setSort, fetchAllFolders } = useActions()

 const onSort = (sorts: ISort) => {
  setSort(sorts)
  fetchAllFolders(currentDir, sorts)
 }

 return (
  <Dropdown
   isOpen={dropdownOpen}
   toggle={toggle}
   direction={"down"}
   className={classes.toggle}
  >
   <DropdownToggle
    caret
    color="info"

   > Sort by name</DropdownToggle>
   <DropdownMenu >
    <DropdownItem onClick={(e) => onSort({ dir: 1, sort: "name" })}>Alphabetically</DropdownItem>
    <DropdownItem divider />
    <DropdownItem onClick={(e) => onSort({ dir: -1, sort: "name" })}>Against the alphabet</DropdownItem>
   </DropdownMenu>
  </Dropdown>
 )
}
export default PlateViewSort