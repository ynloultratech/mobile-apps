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
import { useRouter } from 'next/router';

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
    isInternal: url[0] === '#',
  };
}

function Header(props) {
  const router = useRouter();
  const asPath = router.asPath.substr(1);
  const merchantId = router.query.storeId || (asPath !== 'en' ? asPath : null);

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

  let navMenu = [];
  let menuList = [];
  if (merchantId && merchantInfo && merchantInfo.type === 'agent') {
    navMenu = [
      'feature',
      'showcase',
      'admin',
      'pos',
    ];
    menuList = [
      createData(navMenu[0], '#' + navMenu[0], 90),
      createData(navMenu[1], '#' + navMenu[1], 70),
      createData('admin', 'https://admin.paynup.com'),
      createData('pos', 'https://pos.paynup.com'),
    ];
  } else if (merchantId && merchantInfo && merchantInfo.type === 'dealer') {
    navMenu = [
      'showcase'
    ];
    menuList = [
      createData(navMenu[0], '#' + navMenu[0], 70),
    ];
  } else {
    navMenu = [
      'showcase',
      'feature',
      'admin',
      'pos',
    ];
    menuList = [
      createData(navMenu[0], '#' + navMenu[0], 70),
      createData(navMenu[1], '#' + navMenu[1], 90),
      createData('admin', 'https://admin.paynup.com'),
      createData('pos', 'https://pos.paynup.com'),
    ];
  }

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const logo = merchantId ? (merchantInfo && merchantInfo.logo || null) : '/static/images/mobile-logo.png';
  const logoLarge = merchantId ? (merchantInfo && merchantInfo.logo || null) : '/static/images/mobile-logo-large.png';
  const twitterLink = merchantId ? (merchantInfo ? merchantInfo.twitterLink : null) : 'https://twitter.com/paynup';
  const facebookLink = merchantId ? (merchantInfo && merchantInfo.facebookLink || null) : 'https://www.facebook.com/paynup/';
  const instagramLink = merchantId ? (merchantInfo && merchantInfo.instagramLink || null) : 'https://www.instagram.com/paynup/';

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
                      {item.isInternal ? (
                        <Button component={AnchorLink} offset={item.offset || 0} href={item.url}>
                          {t('mobile-landing:header_' + item.name)}
                        </Button>
                      ) : (
                        <Button component={Link} target="_blank" rel="noopener noreferrer" href={item.url} className={classes.externalLink}>
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
                    {twitterLink &&
                    <IconButton aria-label="twitter" className={classes.socialBtn} size="small" component={Link} href={twitterLink} target="_blank" rel="noopener noreferrer">
                      <i className="ion-social-twitter" />
                    </IconButton>
                    }
                    {facebookLink &&
                    <IconButton aria-label="facebook" className={classes.socialBtn} size="small" component={Link} href={facebookLink} target="_blank" rel="noopener noreferrer">
                      <i className="ion-social-facebook" />
                    </IconButton>
                    }
                    {instagramLink &&
                    <IconButton aria-label="instagram" className={classes.socialBtn} size="small" component={Link} href={instagramLink} target="_blank" rel="noopener noreferrer">
                      <i className="ion-social-instagram" />
                    </IconButton>
                    }
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
