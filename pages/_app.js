import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import { PageTransition } from 'next-page-transitions';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loading from 'react-loading-bar';
import { appWithTranslation, i18n } from '../i18n';
import appTheme from '../theme/appTheme';
/* import css vendors */
import '../node_modules/react-loading-bar/dist/index.css';
import '../node_modules/animate.css/animate.css';
import '../vendors/animate-extends.css';
import '../vendors/page-transition.css';
import '../vendors/slick/slick.css';
import '../vendors/slick/slick-theme.css';

let themeType = 'light';
if (typeof Storage !== 'undefined') { // eslint-disable-line
  themeType = localStorage.getItem('luxiTheme') || 'light';
}

class MyApp extends App {
  state = {
    loading: false,
    theme: {
      ...appTheme('paynup', themeType),
      direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
    }
  };

  componentDidMount() {
    // Set layout direction
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    // Remove preloader
    const preloader = document.getElementById('preloader');
    if (preloader !== null || undefined) {
      preloader.remove();
    }

    // Remove loading bar
    this.setState({ loading: true });
    setTimeout(() => { this.setState({ loading: false }); }, 2000);

    // Refresh JSS in SSR
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    let deferredPrompt;
    const addBtn = document.querySelector('.add-button');
    addBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', () => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  }

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
      <Container>
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
                  key={router.route}
                />
              </PageTransition>
            </div>
          </MuiThemeProvider>
        </StylesProvider>
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
