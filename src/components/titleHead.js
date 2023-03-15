import Link from 'next/link'
import {
  Container,
  Typography,
  Box
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(5)
  },
  boxButton: {
    textAlign:'center',
    margin: theme.spacing(2, 0, 5)
  },
  title: {
    marginBottom: theme.spacing(3)
  }
}))

const TitleHead = ({
  title,
  subtitleHead,
  subtitle,
  variant,
  button,
  path
}) => {
  const classes = useStyle()

  return(
    <Container maxWidth='md' className={classes.container}>
      <Typography component='h1' variant={variant} align='center' color='textPrimary' >
        {title}
      </Typography>
      <Typography component='h5' variant='h5' align='center' color='textPrimary' className={classes.title}>
        {subtitleHead}
      </Typography>
      {
        button
          ? (
              <Link href={path} passHref legacyBehavior>  
                <Box className={classes.boxButton}>
                  {button}
                </Box>
              </Link>
          ) : subtitle
      }

    </Container>
  )
}

export default TitleHead