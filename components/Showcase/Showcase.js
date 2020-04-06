import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '~/i18n';
import useStyles from './showcase-style';

function Showcase(props) {
  const classes = useStyles();
  const { t } = props;

  const sliderSide = useRef(null);
  const sliderCenter = useRef(null);
  const [slider, setSlider] = useState({
    nav1: null,
    nav2: null
  });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setSlider({
      nav1: sliderSide.current,
      nav2: sliderCenter.current
    });
  }, []);

  const settingsCenter = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
    afterChange: (current) => setActiveSlide(current),
  };

  const settingsSide = {
    dots: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: '10px',
    slidesToShow: 5,
    arrows: false,
    responsive: [{
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }]
  };

  const handleDotsNav = index => {
    sliderCenter.current.slickGoTo(index);
  };

  return (
    <div className={classes.root}>
      <svg className={classes.decoTop}>
        <use xlinkHref="/static/images/mobile/deco-wave-top.svg#main" />
      </svg>
      <svg className={classes.decoBottom}>
        <use xlinkHref="/static/images/mobile/deco-wave-bottom.svg#main" />
      </svg>
    </div>
  );
}

Showcase.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['mobile-landing'])(Showcase);
