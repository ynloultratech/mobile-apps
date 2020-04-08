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
import logo from '~/static/images/mobile-logo-gray.png';
import { i18n } from '~/i18n';
import useStyles from './footer-style';

function Copyright() {
  return (
    <Typography variant="body2" display="block" align="center" color="textSecondary">
      &copy;&nbsp;
      {brand.mobile.footerText}
    </Typography>
  );
}

function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { invert } = props;
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  return (
    <Container
      maxWidth="lg"
      component="footer"
      className={clsx(classes.footer, invert && classes.invert)}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
          <Copyright />
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.footerLinks}>
            <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
              +1 800 236 6554
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
              <IconButton aria-label="FB" className={classes.margin} size="small" component={Link} href="https://twitter.com/paynup" target="_blank" rel="noopener noreferrer">
                <i className="ion-social-twitter" />
              </IconButton>
              <IconButton aria-label="TW" className={classes.margin} size="small" component={Link} href="https://www.facebook.com/paynup/" target="_blank" rel="noopener noreferrer">
                <i className="ion-social-facebook" />
              </IconButton>
              <IconButton aria-label="IG" className={classes.margin} size="small" component={Link} href="https://www.instagram.com/paynup/" target="_blank" rel="noopener noreferrer">
                <i className="ion-social-instagram" />
              </IconButton>
            </div>
            <ul>
              <li>
                <Link href="mailto:support@paynup.com" variant="subtitle1" color="textPrimary">
                  support@paynup.com
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
};

Footer.defaultProps = {
  invert: false,
  toggleDir: () => {},
};

export default Footer;
