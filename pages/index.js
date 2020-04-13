import React, { useEffect, useState } from 'react';
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
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_MERCHANT_INFO = gql`
    query merchantInfo($number: String!) {
        merchantInfo(identifier: $number) {
            __typename
            name
            logo
            number
            email
            phone
            socialLinks{
                twitter
                facebook
                instagram
            }
            siteSettings {
                __typename
                primaryColor
                secondaryColor
                headlineText1
                headlineText2
                headlineText3
            }
        }
    }
`;

const PWAPrompt = dynamic(() => import('react-ios-pwa-prompt'), {
  ssr: false
});

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  promptBody: {
    display: 'flex',
    alignItems: 'center',
    '& > img': {
      marginRight: '10px',
    }
  },
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
    marginBottom: sectionMargin(theme.spacing() / 2),
    [theme.breakpoints.down('sm')]: {
      marginTop: sectionMargin(2),
      marginBottom: sectionMargin(2),
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
  const { onToggleDark, onToggleDir, onLoadTheme } = props;
  const merchantInfo = props.initialMerchantInfo;

  if (props.storeId) {
    const { error, data } = useQuery(GET_MERCHANT_INFO, {
      variables: { number: props.storeId },
      notifyOnNetworkStatusChange: true
    });

    if (data && data.merchantInfo) {
      merchantInfo.number = data.merchantInfo.number;
      if (data.merchantInfo.phone) {
        merchantInfo.phone = '+' + data.merchantInfo.phone.replace(/-/g, ' ');
      }
      if (data.merchantInfo.logo) {
        merchantInfo.logo = data.merchantInfo.logo;
      }
      merchantInfo.primaryColor = data.merchantInfo.siteSettings.primaryColor;
      merchantInfo.secondaryColor = data.merchantInfo.siteSettings.secondaryColor;
      merchantInfo.headlineText1 = data.merchantInfo.siteSettings.headlineText1;
      merchantInfo.headlineText2 = data.merchantInfo.siteSettings.headlineText2;
      merchantInfo.headlineText3 = data.merchantInfo.siteSettings.headlineText3;
      merchantInfo.twitterLink = data.merchantInfo.socialLinks.twitter;
      merchantInfo.facebookLink = data.merchantInfo.socialLinks.facebook;
      merchantInfo.instagramLink = data.merchantInfo.socialLinks.instagram;
      if (data.merchantInfo.__typename === 'DealerMerchantInfo') {
        merchantInfo.type = 'dealer';
      } else if (data.merchantInfo.__typename === 'AgentMerchantInfo') {
        merchantInfo.type = 'agent';
      }
    }
  }

  const promptBody = (
    <div className={classes.promptBody}>
      <img src="/static/favicons/apple-icon-57x57.png" alt="paynup" />
      This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.
    </div>
  );

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
          merchantInfo={merchantInfo}
        />
        <main className={classes.containerWrap}>
          <section id="home">
            <Banner merchantInfo={merchantInfo} host={props.host} />
          </section>
          <section id="counter">
            <Counter />
          </section>
          {!merchantInfo || merchantInfo.type !== 'agent' &&
          <section id="showcase">
            <Showcase />
          </section>
          }
          {!merchantInfo || merchantInfo.type !== 'dealer' &&
          <section id="feature" className={classes.spaceTop}>
            <Feature />
          </section>
          }
          <section id="testimonials">
            <Testimonials merchantInfo={merchantInfo} />
          </section>
          <section className={classes.spaceTopShort}>
            <CompanyLogo />
          </section>
        </main>
        <FooterWithDeco toggleDir={onToggleDir} merchantInfo={merchantInfo} />
        <Hidden mdDown>
          <PageNav />
        </Hidden>
        <Hidden mdDown>
          <Notification />
        </Hidden>
        <script src="/static/scripts/particles-spray.js" />
      </div>
      <PWAPrompt timesToShow={50} permanentlyHideOnDismiss={false} copyBody={promptBody} />
    </React.Fragment>
  );
}

Landing.getInitialProps = async (ctx) => {
  return {
    host: ctx.req.headers.host,
    storeId: ctx.query.storeId,
    namespacesRequired: ['common', 'mobile-landing'],
    initialMerchantInfo: {
      type: null,
      number: 21232,
      phone: null,
      primaryColor: '#ED3237',
      secondaryColor: '#ED3237',
      headlineText1: 'Up to 20% OFF!',
      headlineText2: 'Wireless Refills, eGift Cards, Game codes...',
      headlineText3: 'Worldwide top-up to over 500 networks across 140 countries.',
      twitterLink: 'https://twitter.com/paynup',
      facebookLink: 'https://www.facebook.com/paynup/',
      instagramLink: 'https://www.instagram.com/paynup/',
      logo: null,
    }
  };
};

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};


export default Landing;
