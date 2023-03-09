import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3)
  },
  inputLabel: {
    fontWeight: 400,
    color: theme.palette.primary.main
  },
  submit: {
    margin: theme.spacing(3,0,2),
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