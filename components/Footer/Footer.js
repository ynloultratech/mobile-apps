import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import brand from '~/static/text/brand';
import useStyles from './footer-style';
import { useRouter } from 'next/router';

function Copyright(props) {
  const { merchantId, merchantInfo } = props;
  let footerText = brand.mobile.footerText;
  if (merchantId && merchantInfo) {
    if (merchantInfo.type === 'dealer' && merchantInfo.agent) {
      footerText = merchantInfo.agent.name;
    } else if (merchantInfo.type === 'agent') {
      footerText = merchantInfo.name;
    }
  }
  return (
    <Typography variant="body2" display="block" align="center" color="textSecondary">
      Powered by &copy;&nbsp; {footerText}
    </Typography>
  );
}

function Footer(props) {
  const router = useRouter();
  const asPath = router.asPath.substr(1);
  let merchantId = router.query.storeId || (asPath !== 'en' ? asPath : null);

  if (!merchantId && typeof window !== 'undefined' && window.location.hostname !== 'paynup.com' && window.location.hostname !== 'localhost') {
    merchantId = window.location.hostname;
  }

  const classes = useStyles();
  const { invert, merchantInfo } = props;

  let logo = '/static/images/mobile-logo-gray.png';
  const merchantName = merchantId && merchantInfo ? merchantInfo.name : null;
  if (merchantId && merchantInfo) {
    if (merchantInfo.type === 'dealer' && merchantInfo.agent) {
      logo = merchantInfo.agent.logo;
    } else if (merchantInfo.type === 'agent') {
      logo = merchantInfo.logo;
    }
  }

  const address = merchantId ? (merchantInfo && merchantInfo.address || null) : null;
  const email = merchantId ? (merchantInfo && merchantInfo.email || null) : 'support@paynup.com';
  const phone = merchantId ? (merchantInfo && merchantInfo.phone || null) : '+1 800 236 6554';
  const twitterLink = merchantId ? (merchantInfo && merchantInfo.twitterLink || null) : 'https://twitter.com/paynup';
  const facebookLink = merchantId ? (merchantInfo && merchantInfo.facebookLink || null) : 'https://www.facebook.com/paynup/';
  const instagramLink = merchantId ? (merchantInfo && merchantInfo.instagramLink || null) : 'https://www.instagram.com/paynup/';

  return (
    <Container
      maxWidth="lg"
      component="footer"
      className={clsx(classes.footer, invert && classes.invert)}
      id="contact"
    >
      {address &&
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.address}>
          <div><strong>{merchantName}</strong></div>
          <div>{address.line1}</div>
          <div>{address.city}, {address.state} {address.zipCode}</div>
        </Grid>
      </Grid>
      }
      <Grid container spacing={4}>
        <Grid item xs={12} md={3} className={classes.hideDownSm}>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
          <Copyright merchantId={merchantId} merchantInfo={merchantInfo} />
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.footerLinks}>
            <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
              {phone}
            </Typography>
            <ul>
              <li>
                <Link href="/policies/privacy.html" variant="subtitle1" color="textSecondary" target="_blank">
                  Privacy Policy
                </Link>
              </li>
              <li> | </li>
              <li>
                <Link href="/policies/terms_of_sale.html" variant="subtitle1" color="textSecondary" target="_blank">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} md={3} className={classes.showDownSm}>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
          <Copyright merchantId={merchantId} merchantInfo={merchantInfo} />
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.footerLinks}>
            <div className={classes.socmed}>
              {twitterLink &&
              <IconButton aria-label="FB" className={classes.margin} size="small" component={Link} href={twitterLink} target="_blank" rel="noopener noreferrer">
                <i className="ion-social-twitter" />
              </IconButton>
              }
              {facebookLink &&
              <IconButton aria-label="TW" className={classes.margin} size="small" component={Link} href={facebookLink} target="_blank" rel="noopener noreferrer">
              <i className="ion-social-facebook" />
              </IconButton>
              }
              {instagramLink &&
              <IconButton aria-label="IG" className={classes.margin} size="small" component={Link} href={instagramLink} target="_blank" rel="noopener noreferrer">
                <i className="ion-social-instagram" />
              </IconButton>
              }
            </div>
            <ul>
              <li>
                <Link href={`mailto:${email}`} variant="subtitle1" color="textPrimary">
                  {email}
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

Footer.propTypes = {
  invert: PropTypes.bool,
  toggleDir: PropTypes.func,
  merchantInfo: PropTypes.object,
};

Footer.defaultProps = {
  invert: false,
  toggleDir: () => {},
};

export default Footer;
