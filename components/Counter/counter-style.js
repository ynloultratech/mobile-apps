import { makeStyles } from '@material-ui/core/styles';

const counterStyles = makeStyles(theme => ({
  egift: {
    display: 'flex',
    '& > img': {
      width: '100px',
      margin: theme.spacing(0, 2.3),
      [theme.breakpoints.down('md')]: {
        margin: 0
      }
    }
  },
  dots: {
    marginTop: '90px',
  },
  dotsDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '150px',
    '& span': {
      '&:after': {
        content: '""',
        width: 17,
        height: 17,
        borderRadius: '50%',
        background: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light,
        position: 'absolute',
      },
    }
  },
  counterWrap: {
    margin: theme.spacing(10, 0),
    [theme.breakpoints.down('md')]: {
      margin: 0
    }
  },
  text: {},
  counterItem: {
    '& p': {
      color: theme.palette.text.secondary,
      textTransform: 'capitalize',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        justifyContent: 'center',
      },
      '& i': {
        color: theme.palette.text.secondary,
        fontSize: 36,
        marginRight: theme.spacing(2),
        lineHeight: '42px',
        [theme.breakpoints.down('xs')]: {
          fontSize: 28,
          lineHeight: '28px'
        }
      }
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    alignItems: 'center',
    justifyContent: 'center',
    '& $text': {
      textAlign: 'center',
      '& h3': {
        position: 'relative',
        color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
        paddingBottom: theme.spacing(2)
      }
    }
  },
  counterInner: {
    '& > div': {
      position: 'relative',
      '&:after': {
        content: '""',
        height: 60,
        position: 'absolute',
        right: 0,
        top: 30,
        [theme.breakpoints.up('sm')]: {
          borderLeft: `2px solid ${theme.palette.primary.light}`
        }
      }
    },
    '& > div:last-child': {
      '&:after': {
        display: 'none'
      }
    }
  }
}));

export default counterStyles;
