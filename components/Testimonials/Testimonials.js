import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-slick';
import ReactWOW from 'react-wow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import imgAPI from '~/static/images/imgAPI';
import { withTranslation } from '~/i18n';
import Title from '../Title';
import useStyles from './testi-style';

const testiContent = [
  {
    text: 'I have been using pay\'nup for years  and I\'m very satisfied with the services.',
    avatar: imgAPI.avatar[0],
    name: 'Nina Dean',
    title: 'TX',
  },
  {
    text: 'It was easy. I was pleased to use pay\'nup to help out a friend.',
    avatar: imgAPI.avatar[1],
    name: 'Sam Price',
    title: 'CA',
  },
  {
    text: 'It\'s so easy to top up our friend\'s cell phone. Thanks pay\'nup.',
    avatar: imgAPI.avatar[2],
    name: 'Natalie Frank',
    title: 'NYC',
  },
  {
    text: 'I have been using pay\'nup for years  and I\'m very satisfied with the services.',
    avatar: imgAPI.avatar[3],
    name: 'Nina Dean',
    title: 'TX',
  },
  {
    text: 'It was easy. I was pleased to use pay\'nup to help out a friend.',
    avatar: imgAPI.avatar[4],
    name: 'Sam Price',
    title: 'CA',
  },
  {
    text: 'It\'s so easy to top up our friend\'s cell phone. Thanks pay\'nup.',
    avatar: imgAPI.avatar[5],
    name: 'Natalie Frank',
    title: 'NYC',
  },
  {
    text: 'I have been using pay\'nup for years  and I\'m very satisfied with the services.',
    avatar: imgAPI.avatar[6],
    name: 'Nina Dean',
    title: 'TX',
  },
  {
    text: 'It was easy. I was pleased to use pay\'nup to help out a friend.',
    avatar: imgAPI.avatar[7],
    name: 'Sam Price',
    title: 'CA',
  },
  {
    text: 'It\'s so easy to top up our friend\'s cell phone. Thanks pay\'nup.',
    avatar: imgAPI.avatar[8],
    name: 'Natalie Frank',
    title: 'NYC',
  },
];

function Testimonials(props) {
  const classes = useStyles(props);
  const { t } = props;

  const sliderText = useRef(null);
  const sliderAvatar = useRef(null);
  const [slider, setSlider] = useState({
    nav1: null,
    nav2: null
  });

  useEffect(() => {
    setSlider({
      nav1: sliderText.current,
      nav2: sliderAvatar.current
    });
  }, []);

  const settingsText = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
  };

  const settingsAvatar = {
    dots: false,
    infinite: true,
    speed: 500,
    focusOnSelect: true,
    autoplay: true,
    centerPadding: '2px',
    centerMode: true,
    autoplaySpeed: 5000,
    slidesToShow: 7,
    pauseOnHover: false,
    arrows: false,
    responsive: [{
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }]
  };

  return (
    <div className={classes.root}>
      <ReactWOW animation="fadeInUpShort" offset={-50} delay="0.3s" duration="0.5s">
        <div>
          <Title align="center">
            {t('mobile-landing:testimonial_title')}
          </Title>
        </div>
      </ReactWOW>
      <div className={classes.carouselWrap}>
        <ReactWOW animation="fadeInUpShort" offset={-150} delay="0.4s" duration="0.5s">
          <div>
            <Container maxWidth="sm">
              <div className={classes.carouselText}>
                <Carousel ref={sliderText} asNavFor={slider.nav2} {...settingsText}>
                  {testiContent.map((item, index) => (
                    <div className={classes.item} key={index.toString()}>
                      <Typography className={classes.content}>
                        {item.text}
                      </Typography>
                      <Typography className={classes.name}>
                        <strong>{item.name}</strong>
                        &nbsp;-&nbsp;
                        {item.title}
                      </Typography>
                    </div>
                  ))}
                </Carousel>
              </div>
            </Container>
            <div className={classes.carouselAvatar}>
              <Carousel ref={sliderAvatar} asNavFor={slider.nav1} {...settingsAvatar}>
                {testiContent.map((item, index) => (
                  <div className={classes.item} key={index.toString()}>
                    <Avatar alt={item.name} src={item.avatar} className={classes.avatar} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </ReactWOW>
      </div>
      <div className={classes.decoBgBottom} />
    </div>
  );
}

Testimonials.propTypes = {
  t: PropTypes.func.isRequired,
  merchantInfo: PropTypes.object,
};

export default withTranslation(['mobile-landing'])(Testimonials);
