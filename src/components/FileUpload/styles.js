import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mask: {},
  mainImage: {},
  thumbsContainer: {
    display: 'flex',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  dropzone: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: '0 15px 15px 0',
    width: 200,
    height: 150,
    backgroundColor: theme.palette.background.default,
    border: '2px dashed black'
  },
  thumb: {
    position: 'relative',
    width: 200,
    height: 150,
    backgroundSize: 'cover',
    margin: '0 15px 15px 0',
    backgroundPosition: 'center center',

    '& $mainImage': {
      backgroundColor: 'blue',
      padding: '2px 8px',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },

    '& $mask': {
      display: 'none',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: '100%',
      width: '100%',
    },

    '&:hover $mask': {
      display: 'flex',
    },
  },
}))

export default useStyles