import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logosContainer: {
  },
  title: {
    margin: theme.spacing(5, 0),
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
      lineHeight: '36px',
    },
  },
  companyLogos: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: theme.spacing(8, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0),
    },
    '& img': {
      width: 128,
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(0, 4, 0, 0),
      },
      filter: 'grayscale(1) contrast(0.5) brightness(1.5)',
      opacity: theme.palette.type === 'dark' ? 0.5 : 1,
      transition: 'all 0.3s ease-out',
      '&:hover': {
        filter: 'none'
      }
    }
  }
}));

export default useStyles;
