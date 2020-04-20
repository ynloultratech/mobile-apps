import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import brand from '~/static/text/brand';
import { i18n } from '~/i18n';
import useStyles from './footer-style';
import { useRouter } from 'next/router';

function Copyright(props) {
  const { merchantId, merchantInfo } = props;
  console.log(merchantInfo);
  const footerText = merchantId ? (merchantInfo && merchantInfo.name || null) : brand.mobile.footerText;
  return (
    <Typography variant="body2" display="block" align="center" color="textSecondary">
      &copy;&nbsp;
      2020 by {footerText}
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
  const [values, setValues] = useState({
    lang: 'en',
  });

  useEffect(() => {
    setValues({ lang: i18n.language });
  }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    if (event.target.value === 'ar') {
      i18n.changeLanguage('ar');
      props.toggleDir('rtl');
    } else {
      i18n.changeLanguage(event.target.value);
      props.toggleDir('ltr');
    }
  }

  const logo = merchantId ? (merchantInfo && merchantInfo.logo || null) : '/static/images/mobile-logo-gray.png';
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
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
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
                <Link href="https://paynup.com/policies/privacy" variant="subtitle1" color="textSecondary" target="_blank">
                  Privacy Policy
                </Link>
              </li>
              <li> | </li>
              <li>
                <Link href="https://paynup.com/policies/terms_of_sale" variant="subtitle1" color="textSecondary" target="_blank">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
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
