import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import Footer from './Footer';
import useStyles from './footer-style';

function FooterWithDeco(props) {
  const classes = useStyles();
  const text = useText();
  const { t, toggleDir } = props;

  return (
    <div className={classes.footerDeco}>
      <svg className={classes.decoTop}>
        <use xlinkHref="/static/images/mobile/deco-wave-top.svg#main" />
      </svg>
      <div className={classes.decoration} />
      <div className={classes.action}>
        <Typography variant="h4" className={text.subtitle}>
          {t('mobile-landing:footer_text')}
        </Typography>
        <div className={classes.btnArea}>
          <div>
            <img src="/static/images/mobile/app-store.png" alt="app store" />
          </div>
          <div>
            <img src="/static/images/mobile/play-store.png" alt="play store" />
          </div>
        </div>
      </div>
      <Footer toggleDir={toggleDir} merchantInfo={props.merchantInfo} />
    </div>
  );
}

FooterWithDeco.propTypes = {
  t: PropTypes.func.isRequired,
  toggleDir: PropTypes.func.isRequired,
  merchantInfo: PropTypes.object,
};

export default withTranslation(['mobile-landing'])(FooterWithDeco);
