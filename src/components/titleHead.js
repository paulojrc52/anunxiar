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
  }
}))

const TitleHead = ({
  title,
  subtitle,
  variant,
  button,
  path
}) => {
  const classes = useStyle()

  return(
    <Container maxWidth='md' className={classes.container}>
      <Typography component='h1' variant={variant} align='center' color='textPrimary'>
        {title}
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