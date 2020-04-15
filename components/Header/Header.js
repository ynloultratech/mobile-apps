import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import NextLink from 'next/link';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import MobileMenu from './MobileMenu';
import { withTranslation } from '~/i18n';
import linkRouter from '~/static/text/link';
import '~/vendors/hamburger-menu.css';
import useStyles from './header-style';
import navMenu from './menu';

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

function Header(props) {
  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = (scroll > 100);
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const {
    invert,
    t,
    merchantInfo,
  } = props;
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const menuList = [createData(navMenu[0], '#' + navMenu[0], 70)];
  if (merchantInfo && merchantInfo.type !== 'dealer') {
    menuList.push(createData(navMenu[1], '#' + navMenu[1], 90));
  }
  menuList.push(createData(navMenu[2], '#' + navMenu[2], merchantInfo && merchantInfo.type !== 'agent' ? -100 : -400));

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const logo = merchantInfo && merchantInfo.logo || '/static/images/mobile-logo.png';
  const logoLarge = merchantInfo && merchantInfo.logo || '/static/images/mobile-logo-large.png';
  const twitterLink = merchantInfo && merchantInfo.twitterLink ? merchantInfo.twitterLink : 'https://twitter.com/paynup';
  const facebookLink = merchantInfo && merchantInfo.facebookLink ? merchantInfo.facebookLink : 'https://www.facebook.com/paynup/';
  const instagramLink = merchantInfo && merchantInfo.instagramLink ? merchantInfo.instagramLink : 'https://www.instagram.com/paynup/';

  return (
    <Fragment>
      { isMobile && (<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} menuList={menuList} />) }
      <AppBar
        component="header"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          fixed && classes.fixed,
          openDrawer && classes.openDrawer
        )}
      >
        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav className={clsx(classes.navMenu, invert && classes.invert)}>
              { isMobile && !isExtraSmallMobile && (
                <IconButton
                  onClick={handleOpenDrawer}
                  className={clsx('hamburger hamburger--spin', classes.mobileMenu, openDrawer && 'is-active')}
                >
                  <span className="hamburger-box">
                    <span className={clsx(classes.bar, 'hamburger-inner')} />
                  </span>
                </IconButton>
              )}
              <div className={classes.logo}>
                {invert ? (
                  <NextLink href={linkRouter.mobile.home}>
                    <a>
                      <img src={fixed ? logo : logoLarge} alt="logo" />
                    </a>
                  </NextLink>
                ) : (
                  <AnchorLink href="#home">
                    <img src={fixed ? logo : logoLarge} alt="logo" />
                  </AnchorLink>
                )}
              </div>
              {isDesktop && (
                <Scrollspy
                  items={navMenu}
                  currentClassName="active"
                >
                  {menuList.map(item => (
                    <li key={item.id.toString()}>
                      {invert ? (
                        // eslint-disable-next-line
                        <Button offset={item.offset || 0} href={'/' + item.url}>
                          {t('mobile-landing:header_' + item.name)}
                        </Button>
                      ) : (
                        // eslint-disable-next-line
                        <Button component={AnchorLink} offset={item.offset || 0} href={item.url}>
                          {t('mobile-landing:header_' + item.name)}
                        </Button>
                      )}
                    </li>
                  ))}
                </Scrollspy>
              )}
            </nav>
            <nav className={classes.navMenu}>
              {!invert && (
                <Hidden xsDown>
                  <Fragment>
                    <IconButton aria-label="twitter" className={classes.socialBtn} size="small" component={Link} href={twitterLink} target="_blank" rel="noopener noreferrer">
                      <i className="ion-social-twitter" />
                    </IconButton>
                    <IconButton aria-label="facebook" className={classes.socialBtn} size="small" component={Link} href={facebookLink} target="_blank" rel="noopener noreferrer">
                      <i className="ion-social-facebook" />
                    </IconButton>
                    <IconButton aria-label="instagram" className={classes.socialBtn} size="small" component={Link} href={instagramLink} target="_blank" rel="noopener noreferrer">
                      <i className="ion-social-instagram" />
                    </IconButton>
                  </Fragment>
                </Hidden>
              )}
              { isMobile && isExtraSmallMobile && (
                <IconButton
                  onClick={handleOpenDrawer}
                  className={clsx('hamburger hamburger--spin', classes.mobileMenu, openDrawer && 'is-active')}
                >
                  <span className="hamburger-box">
                    <span className={clsx(classes.bar, 'hamburger-inner')} />
                  </span>
                </IconButton>
              )}
            </nav>
          </div>
        </Container>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
  t: PropTypes.func.isRequired,
  merchantInfo: PropTypes.object,
};

Header.defaultProps = {
  sticky: false,
  invert: false
};

export default withTranslation(['mobile-landing'])(Header);
