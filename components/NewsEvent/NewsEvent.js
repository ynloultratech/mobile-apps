import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useText } from '~/theme/common';
import { withTranslation } from '~/i18n';
import Title from '../Title';
import NewsCard from '../Cards/News';
import ParallaxLarge from '../Parallax/Large';
import imgAPI from '~/static/images/imgAPI';
import useStyle from './news-event-style';

function NewsEvent(props) {
  const classes = useStyle();
  const text = useText();
  const { t } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <div className={classes.decoBgTop} />
      <div className={classes.parallaxEvent}>
        <ParallaxLarge />
      </div>
      <Title align="center">
        {t('mobile-landing:news_title')}
      </Title>
    </div>
  );
}

NewsEvent.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(NewsEvent);
