import {useQuery} from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import {makeStyles} from '@material-ui/core/styles';
import {gql} from 'apollo-boost';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import Banner from '../components/Banner';
import CompanyLogo from '../components/CompanyLogo';
import Counter from '../components/Counter';
import Feature from '../components/Feature';
import FooterWithDeco from '../components/Footer/FooterWithDeco';
import Header from '../components/Header';
import Notification from '../components/Notification';
import PageNav from '../components/PageNav';
import Showcase from '../components/Showcase';
import Testimonials from '../components/Testimonials';
import brand from '../static/text/brand';

const GET_MERCHANT_INFO = gql`
  query merchantInfo($number: String!) {
    merchantInfo(identifier: $number) {
      __typename
      name
      logo
            number
            email
            phone
            address {
                line1
                line2
                city
                state
                zipCode
                country
                fullAddress
            }
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
            ... on DealerMerchantInfo {
                agent {
                    name
                    logo
                }
            }
            ... on AgentMerchantInfo {
                adminUrl
                posUrl
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
  const router = useRouter();
  const classes = useStyles();
  const { onToggleDark, onToggleDir, onLoadTheme } = props;
  const merchantInfo = {};
  const asPath = router.asPath.substr(1);
  let merchantId = router.query.storeId || (asPath !== 'en' ? asPath : null);

  if (!merchantId && typeof window !== 'undefined' && window.location.hostname !== 'paynup.com' && window.location.hostname !== 'localhost') {
    merchantId = window.location.hostname;
  }

  const { loading, error, data } = useQuery(GET_MERCHANT_INFO, {
    variables: { number: merchantId || 21232 },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
  });

  let title = null;

  if (!loading && typeof document !== 'undefined') {
    if (merchantId && data && data.merchantInfo) {
      merchantInfo.name = data.merchantInfo.name;
      title = merchantInfo.name + ' -';
      merchantInfo.number = data.merchantInfo.number;
      merchantInfo.email = data.merchantInfo.email;
      merchantInfo.agent = data.merchantInfo.agent;
      merchantInfo.address = data.merchantInfo.address;
      merchantInfo.phone = data.merchantInfo.phone;
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
      merchantInfo.adminUrl = data.merchantInfo.adminUrl;
      merchantInfo.posUrl = data.merchantInfo.posUrl;
      if (data.merchantInfo.__typename === 'DealerMerchantInfo') {
        merchantInfo.type = 'dealer';
      } else if (data.merchantInfo.__typename === 'AgentMerchantInfo') {
        merchantInfo.type = 'agent';
      }
    } else {
      title = brand.mobile.name;
    }

    // Remove preloader
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader !== null || undefined) {
        preloader.remove();
      }
    }, 1000);
  }

  const [loadingTheme, setLoadingTheme] = useState(true)
  useEffect(() => {
    if (loadingTheme && merchantInfo.primaryColor && merchantInfo.secondaryColor) {
      setLoadingTheme(false);
      onLoadTheme(merchantInfo.primaryColor, merchantInfo.secondaryColor);
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && merchantInfo.type === 'dealer' && window.PaynUpRefillBar !== undefined) {
      window.PaynUpRefillBar({
        element: document.getElementById('refill-bar'),
        store: merchantInfo ? merchantInfo.number : 21232,
        primaryColor: merchantInfo ? merchantInfo.primaryColor : '#ED3237',
        secondaryColor: merchantInfo ? merchantInfo.secondaryColor : '#ED3237',
      });
    }
  });

  const promptBody = (
    <div className={classes.promptBody}>
      <img src="/static/favicons/apple-icon-57x57.png" alt="paynup" />
      This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.
    </div>
  );

  let domain = null;
  if (typeof window !== 'undefined') {
    domain = window.location.hostname;
  }

  return (
    <React.Fragment>
      <Head>
        <meta property="og:url" content={domain} />
        <meta property="og:title" content={`${domain} | ${brand.mobile.ogTitle}`} />
        <meta
          property="og:description"
          content={brand.mobile.desc}
        />
        <meta property="og:site_name" content={domain} />
        <meta property="twitter:site" content={domain} />
        <meta property="twitter:domain" content={domain} />
        <meta name="twitter:site" content={domain} />
        <title>
          { title } Home Page
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
            <Banner merchantInfo={merchantInfo} />
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

Landing.getInitialProps = async () => ({
  namespacesRequired: ['common', 'mobile-landing'],
})

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  onLoadTheme: PropTypes.func.isRequired,
  merchantId: PropTypes.string,
};


export default Landing;
