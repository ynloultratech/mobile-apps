import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withTranslation } from '~/i18n';
import useStyles from './header-style';

function MobileMenu(props) {
  const classes = useStyles();
  const { toggleDrawer, open, t } = props;
  const SideList = () => (
    <div
      className={classes.mobileNav}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div className={clsx(classes.menu, open && classes.menuOpen)}>
        <List component="nav">
          {props.menuList.map((item, index) => (
            item.isInternal ? (
              <ListItem
                button
                component="a"
                href={`#${item.name}`}
                key={item.name}
                index={index.toString()}
                style={{ animationDuration: index * 0.15 + 's' }}
              >
                <ListItemText
                  primary={t('mobile-landing:header_' + item.name)}
                  className={classes.menuList}
                />
              </ListItem>
            ) : (
              <ListItem
                button
                component="a"
                href={item.url}
                key={item.name}
                index={index.toString()}
                style={{ animationDuration: index * 0.15 + 's' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText
                  primary={t('mobile-landing:header_' + item.name)}
                  className={classes.menuList}
                />
              </ListItem>
            )
          ))}
        </List>
      </div>
    </div>
  );

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      classes={{
        paper: classes.paperNav
      }}
    >
      <SideList />
    </SwipeableDrawer>
  );
}

MobileMenu.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  merchantInfo: PropTypes.object,
};

export default withTranslation(['mobile-landing'])(MobileMenu);
