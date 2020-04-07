import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Counter from '../components/Counter';
import Feature from '../components/Feature';
import Showcase from '../components/Showcase';
import Testimonials from '../components/Testimonials';
import CompanyLogo from '../components/CompanyLogo';
import FooterWithDeco from '../components/Footer/FooterWithDeco';
import PageNav from '../components/PageNav';
import Notification from '../components/Notification';
import brand from '../static/text/brand';

const PWAPrompt = dynamic(() => import('react-ios-pwa-prompt'), {
  ssr: false
});

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? theme.palette.background.dafault : theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('md')]: {
      marginBottom: sectionMargin(6),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: sectionMargin(theme.spacing() / 2),
    }
  },
  spaceTop: {
    marginTop: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('md')]: {
      marginTop: sectionMargin(6),
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: sectionMargin(theme.spacing() / 2),
    }
  },
  spaceBottomShort: {
    marginBottom: sectionMargin(theme.spacing() / 2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: sectionMargin(2),
    }
  },
  spaceTopShort: {
    marginTop: sectionMargin(theme.spacing() / 2),
    [theme.breakpoints.down('sm')]: {
      marginTop: sectionMargin(2),
    }
  },
  containerWrap: {
    marginTop: -40,
    '& > section': {
      position: 'relative'
    }
  }
}));

function Landing(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;

  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.mobile.name }
          &nbsp; - Home Page
        </title>
      </Head>
      <CssBaseline />
      <section id="home" />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <main className={classes.containerWrap}>
          <section id="home">
            <Banner />
          </section>
          <section id="counter">
            <Counter />
          </section>
          <section id="feature" className={classes.spaceTop}>
            <Feature />
          </section>
          <section id="showcase">
            <Showcase />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <section className={classes.spaceTopShort}>
            <CompanyLogo />
          </section>
        </main>
        <FooterWithDeco toggleDir={onToggleDir} />
        <Hidden mdDown>
          <PageNav />
        </Hidden>
        <Hidden mdDown>
          <Notification />
        </Hidden>
        <script src="/static/scripts/particles-spray.js" />
      </div>
      <PWAPrompt timesToShow={50} permanentlyHideOnDismiss={false} />
    </React.Fragment>
  );
}

Landing.getInitialProps = async () => ({
  namespacesRequired: ['common', 'mobile-landing'],
});

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};


export default Landing;
