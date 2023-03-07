import Link from "next/link"
import {
  Box,
  Container,
  Grid,
  Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    }
  },
  boxFooter: {
    textAlign: 'center',
  }
})) 

const Footer = () => {
  const classes = useStyles()

  return(
    <Container maxWidth='lg' component='footer' className={classes.footer}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Box className={classes.boxFooter}>
            <Link href='#' passHref legacyBehavior>
              <Typography color="textSecondary" variant="subtitle1">Ajuda e Contato</Typography>
            </Link>
            </Box>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Box className={classes.boxFooter}>
            <Link href='#' passHref legacyBehavior>
              <Typography color="textSecondary" variant="subtitle1">Dicas e Segurança</Typography>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Box className={classes.boxFooter}>
            <Link href='/user/publish' passHref legacyBehavior>
              <Typography color="textSecondary" variant="subtitle1">Anunciar e Vender</Typography>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Box className={classes.boxFooter}>
            <Link href='#' passHref legacyBehavior>
              <Typography color="textSecondary" variant="subtitle1">Plano Profissional</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Footer 