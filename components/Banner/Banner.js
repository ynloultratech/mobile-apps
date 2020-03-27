import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import imgAPI from '~/static/images/imgAPI';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './banner-style';

function Banner(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const elem = useRef(null);
  const [hide, setHide] = useState(false);

  const handleScroll = () => {
    if (!elem.current) {
      return;
    }

    const doc = document.documentElement;
    const elTop = elem.current.offsetTop - 200;
    const elBottom = elTop + elem.current.getBoundingClientRect().height;
    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <div className={classes.root} ref={elem}>
      <div className={classes.background}>
        <div className={classes.gradient}>
          <div className={classes.decoWave} />
          <Hidden smDown>
            <div className={classes.decoLine} />
          </Hidden>
          <div className={clsx(classes.decoInner, hide && classes.hide)}>
            <canvas id="particle_art_mobile" width="500" height="700" />
          </div>
        </div>
      </div>
      <Container fixed={isDesktop}>
        <Grid container>
          <Grid item md={7} xs={12}>
            <div className={classes.text}>
              <Typography variant="h3" className={text.title}>
                {t('mobile-landing:banner_title')}
                &nbsp;
                <strong>
                  {t('mobile-landing:banner_titlestrong')}
                </strong>
              </Typography>
              <Typography variant="h5" className={text.subtitle}>
                {t('mobile-landing:banner_desc')}
              </Typography>
              <div className={classes.btnArea}>
                <Link href="/">
                  <a>
                    <img src="/static/images/mobile/app-store.png" alt="app store" />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <img src="/static/images/mobile/play-store.png" alt="play store" />
                  </a>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item md={5} xs={12}>
            <div className={classes.decoration}>
              <div className={classes.phoneIllustration}>
                <img src={imgAPI.mobile[0]} className={classes.phone} alt="illustration" />
                <Hidden mdDown>
                  <img src={imgAPI.mobile[1]} className={clsx(classes.widgetTop, 'fragment-fadeUp')} alt="illustration" />
                  <img src={imgAPI.mobile[2]} className={clsx(classes.widgetLeft, 'fragment-fadeUp')} alt="illustration" />
                  <img src={imgAPI.mobile[3]} className={clsx(classes.widgetRight, 'fragment-fadeUp')} alt="illustration" />
                </Hidden>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Banner.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(Banner);
