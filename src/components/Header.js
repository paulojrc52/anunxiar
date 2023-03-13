import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/client'
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
    marginLeft: '8px',
  },
  divider: {
    margin: '8px 0'
  }
}))

function ButtonAppBar() {
  const classes = useStyles()
  const [ anchorUserMenu, setAnchorUserMenu ] = useState(false)
  const [ session ] = useSession()

  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              AnunXiar
            </Typography>
            <Link href={session ? '/user/publish' : '/auth/signin'} passHref legacyBehavior>
              <Button color='secondary' variant='outlined'>
                Anunciar e vender
              </Button>
            </Link>
            {
              session
                ? (
                  <IconButton color='secondary' onClick={(event) => setAnchorUserMenu(event.currentTarget)}>
                    {
                      session.user.image 
                        ? <Avatar src={session.user.image} />
                        : <AccountCircle />
                    }
                    <Typography variant='subtitle2' color='secondary' className={classes.userName}>
                      {session.user.name}
                    </Typography>
                  </IconButton>
                ) : null
            }

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
              <MenuItem onClick={() => signOut({
                callbackUrl:`/`
              })}>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default ButtonAppBar