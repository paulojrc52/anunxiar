import React, { useState } from 'react'
import {
  Avatar,
  Container,
  Divider,
  makeStyles,
  Menu,
  MenuItem
} from '@material-ui/core'

import {
  AppBar,
  Toolbar,
  Typography,
  Button, 
} from '@material-ui/core'

import IconButton from '@material-ui/core/IconButton'

import Link from 'next/link'
import { AccountCircle } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  userName: {
    marginLeft: '7px',
  },
  divider: {
    margin: '8px 0'
  }
}))

function ButtonAppBar() {
  const classes = useStyles()
  const [ anchorUserMenu, setAnchorUserMenu ] = useState(false)

  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              AnunXiar
            </Typography>
            <Link href='/user/publish' passHref legacyBehavior>
              <Button color='secondary' variant='outlined'>
                Anunciar e vender
              </Button>
            </Link>

            <IconButton color='secondary' onClick={(event) => setAnchorUserMenu(event.currentTarget)}>
              {
                true === false 
                ? <Avatar src='' />
                : <AccountCircle />
              }
              <Typography variant='subtitle2' color='secondary' className={classes.userName}>
                Paulo Junior
              </Typography>
            </IconButton>

            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
              anchorOrigin={{
                vertical:'top',
                horizontal:'right'
              }}
            >
              <Link href='/user/dashboard' passHref legacyBehavior>
                <MenuItem>Meus anúncios</MenuItem>
              </Link>
              <Link href='/user/publish' passHref legacyBehavior>
                <MenuItem>Publicar novo anúncio</MenuItem>
              </Link>
              <Divider className={classes.divider}/>
              <MenuItem>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default ButtonAppBar