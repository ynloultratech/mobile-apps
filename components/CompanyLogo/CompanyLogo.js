import React from 'react';
import PropTypes from 'prop-types';
import ReactWOW from 'react-wow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from '~/i18n';
import useStyles from './logo-style';

const logos = [
  '/static/images/logos/architect.png',
  '/static/images/logos/cloud.png',
  '/static/images/logos/coin.png',
  '/static/images/logos/mobile.png',
  '/static/images/logos/profile.png',
  '/static/images/logos/saas.png',
];

function CompanyLogo(props) {
  const classes = useStyles();
  const { t } = props;

  return (
    <Container fixed>
      <Typography
        align="center"
        variant="h4"
        className={classes.title}
      >
        {t('mobile-landing:company_title')}
      </Typography>
      <ReactWOW animation="fadeInUpShort" offset={-200} delay="0.3s" duration="0.5s">
        <div className={classes.root}>
          {logos.map((logo, index) => (
            <img src={logo} alt={'logo' + index.toString()} key={index.toString()} />
          ))}
        </div>
      </ReactWOW>
    </Container>
  );
}

CompanyLogo.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(CompanyLogo);
