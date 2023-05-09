import { ChangeEvent, useState } from 'react'
import { Button, Input, InputGroup } from 'reactstrap'
import { useActions, useAppSelector } from '../../../hooks/hooks'
import classes from './search.module.scss'

const SearchFile = () => {
  const [search, setSearch] = useState<string>("")
  const { currentDir, sorts } = useAppSelector(state => state.files)
  const { fetchAllFolders} = useActions()
  const onSearchSet = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSearchFetch = () => {
    if (search === "") return
    fetchAllFolders(currentDir, sorts, search)
    setSearch("")
  }

  const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") onSearchFetch()
    if(e.code === "Escape") setSearch("")
  }
 return (
  <InputGroup className={classes.search} size="sm">
     <Input
       placeholder="search..."
       onChange={(e) => onSearchSet(e)}
       onKeyDown={(e)=>onKeyHandler(e)}
     value={search}
     />
     <Button
       onClick={onSearchFetch}
       color="info">
    Search File
  </Button>
</InputGroup>
 )
}
export default SearchFile