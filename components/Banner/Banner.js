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
import QRCode from 'qrcode.react';

function Banner(props) {
  const classes = useStyles(props);
  const text = useText();
  const { merchantInfo } = props;

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

  const [url, setUrl] = useState(null)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setUrl(window.location.href);
  }, []);

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
                {merchantInfo.headlineText1 || 'Up to 20% OFF!'}
                &nbsp;
                <strong>
                  {merchantInfo.headlineText2 || 'Wireless Refills, eGift Cards, Game codes...'}
                </strong>
              </Typography>
              <div id="refill-bar" className={classes.refill_bar} />
              <Typography variant="h5" className={text.subtitle}>
                {merchantInfo.headlineText3 || 'Worldwide top-up to over 500 networks across 140 countries.'}
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
          </Grid>
          <Grid item md={5} xs={12}>
            <div className={classes.decoration}>
              <div className={classes.phoneIllustration}>
                {isDesktop && url &&
                <div className={classes.qrCode}>
                  <QRCode value={url} renderAs="svg" bgColor="rgba(0,0,0,0)" fgColor="#ffffff" size={170} alt="qr code" />
                </div>
                }
                <img src={imgAPI.mobile[0]} className={classes.phone} alt="illustration" />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Banner.propTypes = {
  t: PropTypes.func.isRequired,
  merchantInfo: PropTypes.object,
};

export default withTranslation(['mobile-landing'])(Banner);
