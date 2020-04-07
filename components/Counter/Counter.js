import React from 'react';
import PropTypes from 'prop-types';
import ReactWOW from 'react-wow';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withTranslation } from '~/i18n';
import useStyles from './counter-style';
import imgAPI from '~/static/images/imgAPI';

function Counter() {
  const classes = useStyles();

  const egift = imgAPI.egift.map((path, i) => (
    <img src={path} alt="illustration" key={i.toString()} />
  ));

  return (
    <div className={classes.counterWrap}>
      <Container>
        <ReactWOW animation="fadeInUpShort" offset={0} delay="0.3s" duration="0.5s">
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.egift}
            spacing={6}
          >
            {egift}
          </Grid>
        </ReactWOW>
      </Container>
    </div>
  );
}

Counter.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(Counter);
