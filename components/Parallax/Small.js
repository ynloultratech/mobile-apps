import React from 'react';
import clsx from 'clsx';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import useStyles from './parallax-style';

export default function ParallaxLarge() {
  const classes = useStyles();
  return (
    <div className={classes.parallaxWrap}>
      <ParallaxProvider>
        <div className={clsx(classes.innerParallax, classes.small)}>
          <Parallax
            y={[10, 50]}
            tagOuter="figure"
          >
            <svg className={classes.triangle}>
              <use xlinkHref="/static/images/mobile/triangle.svg#main" />
            </svg>
          </Parallax>
          <Parallax
            y={[0, 60]}
            tagOuter="figure"
          >
            <svg className={classes.circle}>
              <use xlinkHref="/static/images/mobile/circle.svg#main" />
            </svg>
          </Parallax>
          <Parallax
            y={[-20, 20]}
            tagOuter="figure"
          >
            <div className={classes.squareDot}>
              <svg className={classes.dotMany}>
                <use xlinkHref="/static/images/mobile/dot-many.svg#main" />
              </svg>
            </div>
          </Parallax>
        </div>
      </ParallaxProvider>
    </div>
  );
}
