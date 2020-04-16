import React from 'react';
import App from 'next/app';
import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import { PageTransition } from 'next-page-transitions';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loading from 'react-loading-bar';
import { appWithTranslation, i18n } from '../i18n';
import appTheme from '../theme/appTheme';
import withData from '../lib/apollo';
/* import css vendors */
import '../node_modules/react-loading-bar/dist/index.css';
import '../node_modules/animate.css/animate.css';
import '../vendors/animate-extends.css';
import '../vendors/page-transition.css';
import '../vendors/slick/slick.css';
import '../vendors/slick/slick-theme.css';

class MyApp extends App {
  state = {
    loading: false,
    theme: {
      ...appTheme('paynup', 'light'),
      direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
    }
  };

  componentDidMount() {
    // Set layout direction
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    // Remove loading bar
    this.setState({ loading: true });
    setTimeout(() => { this.setState({ loading: false }); }, 2000);

    // Refresh JSS in SSR
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  loadTheme = (primaryColor, secondaryColor) => {
    this.setState({
      theme: {
        ...appTheme('paynup', 'light'),
        palette: {
          primary: {
            light: `${lighten(primaryColor, 0.7)}`,
            main: `${primaryColor}`,
            dark: `${darken(primaryColor, 0.7)}`
          },
          secondary: {
            light: `${lighten(secondaryColor, 0.5)}`,
            main: `${darken(secondaryColor, 0.7)}`,
            dark: `${darken(secondaryColor, 0.2)}`
          }
        }
      }
    });
  };

  toggleDarkTheme = () => {
    const { theme } = this.state;
    const newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
    localStorage.setItem('luxiTheme', theme.palette.type === 'light' ? 'dark' : 'light');
    this.setState({
      theme: {
        ...appTheme('joker', newPaletteType),
        direction: theme.direction,
      }
    });
  };

  toggleDirection = dir => {
    const { theme } = this.state;
    document.dir = dir;
    this.setState({
      theme: {
        ...theme,
        direction: dir,
        palette: {
          ...theme.palette
        }
      }
    });
  };

  render() {
    const { theme, loading } = this.state;
    const muiTheme = createMuiTheme(theme);
    const { Component, pageProps, router } = this.props; // eslint-disable-line
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
    return (
      <StylesProvider jss={jss}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Loading
            show={loading}
            color={theme.palette.primary.main}
            showSpinner={false}
          />
          <div id="main-wrap">
            <PageTransition timeout={300} classNames="page-fadeUp-transition">
              <Component
                {...pageProps}
                onToggleDark={this.toggleDarkTheme}
                onToggleDir={this.toggleDirection}
                onLoadTheme={this.loadTheme}
                key={router.route}
              />
            </PageTransition>
          </div>
        </MuiThemeProvider>
      </StylesProvider>
    );
  }
}

export default withData(appWithTranslation(MyApp));
