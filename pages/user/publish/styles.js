import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  boxContainer: {
    paddingBottom: theme.spacing(3),
  },
  boxButton: {
    textAlign:'right',
  },
  inputLabel: {
    fontWeight: 400,
    color: theme.palette.primary.main,
  },
  loading: {
    display: 'block',
    margin: '10px left'
  }
}))

export default useStyles