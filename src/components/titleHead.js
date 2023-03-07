import { Container, Typography, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Link from 'next/link'

const useStyle = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(6,0,6)
  },
  boxButton: {
    textAlign:'center',
    margin: theme.spacing(3)
  },

}))

const TitleHead = ({ title, subtitle, titleButton, path}) => {
  const classes = useStyle()
  return(
    <Container maxWidth='sm' className={classes.container}>
      <Typography component='h1' variant='h2' align='center' color='textPrimary'>
        {title}
      </Typography>
      {
        subtitle
          ?
          <Typography component='h5' variant='h5' align='center' color='textPrimary' className={classes.subtitle}>
            {subtitle}
          </Typography>
          : 
          null
      }
      {
        titleButton
          ? 
          <Link href={path} passHref legacyBehavior>  
            <Box className={classes.boxButton}>
              <Button variant='contained' color='primary'>
                {titleButton}
              </Button>
            </Box>
          </Link>
          :
          null

      }
    </Container>
  )
}

export default TitleHead