import { useRouter } from 'next/router'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  Grid,
  Paper,
  InputBase,
  IconButton,
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/search'

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    marginBottom: 20,
  },
}))

const InputSearch = () => {
  const [search, setSearch] = useState()
  const classes = useStyles()
  const router = useRouter()

  const handleSubmitSearch = () => {
    router.push({
      pathname: `/search/${search}`
    })
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <Paper className={classes.searchPaper}>
          <InputBase 
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Ex: Iphone XS Max com garantia'
            fullWidth
          />
          <IconButton
            type='submit'
            aria-label='search'
            onClick={handleSubmitSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>  
    </Grid>

  )
}

export default InputSearch