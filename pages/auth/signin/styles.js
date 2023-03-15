import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  boxBottomLess: {
    margin: theme.spacing(2),
    textAlign: 'center'
  },
  inputLabel: {
    fontWeight: 400,
    color: theme.palette.primary.main
  },
  submit: {
    margin: theme.spacing(3,0,2),
  },
  signup: {
    width: 100,
    borderRadius: 50
  },
  loading: {
    display: 'block',
    margin: '10px auto'
  },
  errorMessage: {
    margin: '10px 0'
  },
}))

export default useStyles