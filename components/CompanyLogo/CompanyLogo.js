import React from 'react';
import PropTypes from 'prop-types';
import ReactWOW from 'react-wow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from '~/i18n';
import useStyles from './logo-style';

const logos = [
  '/static/images/logos/tricom.png',
  '/static/images/logos/claro.png',
  '/static/images/logos/etisalat.png',
  '/static/images/logos/avea.png',
  '/static/images/logos/8ta.png',
  '/static/images/logos/airtel.png',
  '/static/images/logos/alegro.png',
  '/static/images/logos/banglalink.png',
  '/static/images/logos/bayn.png',
  '/static/images/logos/beeline.png',
  '/static/images/logos/carrefour.png',
  '/static/images/logos/cubacell.png',
];

function CompanyLogo(props) {
  const classes = useStyles();
  const { t } = props;
  const chunks = [];
  const clogos = [...logos];

  while (clogos.length) {
    chunks.push(clogos.splice(0, 4));
  }

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
        {chunks.map((items, i) => (
          <div className={classes.root} key={i.toString()}>
            {items.map((logo, index) => (
              <img src={logo} alt={'logo' + index.toString()} key={index.toString()} />
            ))}
          </div>
        ))}
      </ReactWOW>
    </Container>
  );
}

CompanyLogo.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(CompanyLogo);
