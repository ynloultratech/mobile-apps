import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '~/i18n';
import Title from '../Title';
import useStyle from './news-event-style';

function NewsEvent(props) {
  const classes = useStyle();
  const { t } = props;

  return (
    <div className={classes.root}>
      <div className={classes.decoBgTop} />
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
