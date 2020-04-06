import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import YouTube from 'react-youtube';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import imgAPI from '~/static/images/imgAPI';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import yt from '~/youtube';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import ParallaxSmall from '../Parallax/Small';
import TitleSecondary from '../Title/TitleSecondary';
import Title from '../Title';
import useStyles from './feature-style';

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Zoom ref={ref} {...props} />;
});

function Feature(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [player, setPlayer] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const handleClickOpen = () => {
    if (yt.use) {
      setOpenPopup(true);
      player[0].playVideo();
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
    player[0].pauseVideo();
  };

  const _onReady = event => {
    player.push(event.target);
    setPlayer(player);
  };

  const opts = {
    height: '360',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 1,
      mute: 0,
      origin: 'https://site.paynup.com'
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={openPopup}
        TransitionComponent={Transition}
        keepMounted
        classes={{ paper: classes.videoPopup }}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {t('mobile-landing:feature_video')}
          <IconButton onClick={handleClose} className={classes.closeBtn}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {yt.use && (
            <YouTube
              videoId="MltGO66gTbo"
              onReady={_onReady}
              opts={opts}
            />
          )}
        </DialogContent>
      </Dialog>
      <Title align="center">
        {t('mobile-landing:feature_title')}
      </Title>
      <Container fixed>
        <div className={clsx(classes.item, classes.first)}>
          <Grid container direction={isMobile ? 'column-reverse' : 'row'}>
            <Grid item md={6} xs={12}>
              <div className={classes.illustrationLeft}>
                <svg className={classes.decoPrimary}>
                  <use xlinkHref="/static/images/mobile/deco-feature.svg#main" />
                </svg>
                <ParallaxSmall />
                <figure className={classes.screen}>
                  <img src={imgAPI.mobile[4]} alt="illustration" />
                </figure>
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <div className={classes.text}>
                <TitleSecondary align={isMobile ? 'center' : 'left'} text={t('mobile-landing:feature_title1')} />
                <Typography display="block" component="p" className={text.subtitle2}>
                  {t('mobile-landing:feature_desc1')}
                </Typography>
              </div>
              <Button size="small" className={classes.btn}>Retailers</Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className={classes.bgColor}>
        <div className={classes.decoBgTop} />
        <Container fixed>
          <div className={classes.item}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <div className={classes.text}>
                  <TitleSecondary align={isMobile ? 'center' : 'left'} text={t('mobile-landing:feature_title2')} />
                  <Typography display="block" component="p" className={text.subtitle2}>
                    {t('mobile-landing:feature_desc2')}
                  </Typography>
                </div>
                <Button size="small" className={classes.btn}>Distributors</Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={classes.illustrationRight}>
                  <svg className={classes.decoSecondary}>
                    <use xlinkHref="/static/images/mobile/deco-feature.svg#main" />
                  </svg>
                  <ParallaxSmall />
                  <figure className={classes.screen}>
                    <img src={imgAPI.mobile[5]} alt="screen" />
                  </figure>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={clsx(classes.item, classes.last)}>
            <TitleSecondary align="center" text={t('mobile-landing:feature_title3')} />
            <Typography align="center" component="p" className={text.subtitle2}>
              {t('mobile-landing:feature_desc3')}
            </Typography>
            <Container>
              <Grid container>
                <Grid item md={12} xs={12} className={classes.itemCenter}>
                  <div className={classes.illustrationCenter}>
                    <svg className={classes.decoPrimaryBig}>
                      <use xlinkHref="/static/images/mobile/deco-feature.svg#main" />
                    </svg>
                    <Paper className={classes.video}>
                      <img src={imgAPI.mobile[21]} alt="screen1" />
                      <Typography variant="h6">
                        {t('mobile-landing:feature_watch')}
                      </Typography>
                    </Paper>
                    <Paper className={classes.video}>
                      <img src={imgAPI.mobile[22]} alt="screen2" />
                      <Typography variant="h6">
                        {t('mobile-landing:feature_watch2')}
                      </Typography>
                    </Paper>
                    <Paper className={classes.video}>
                      <img src={imgAPI.mobile[23]} alt="screen3" />
                      <Typography variant="h6">
                        {t('mobile-landing:feature_watch3')}
                      </Typography>
                    </Paper>
                  </div>
                  <Button component={Link} href="https://www.w3schools.com/code/tryit.asp?filename=GCIMC6T4TEGV" target="_blank" rel="noreferrer noopener" className={classes.btnLink}>Add Our Bar Now</Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Container>
      </div>
    </div>
  );
}

Feature.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(Feature);
