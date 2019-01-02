import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navigation from '../../ui/layouts/Navigation';
import App from './App';
import teal from '@material-ui/core/colors/teal';

const primary = "#304d9d";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: teal[800],
    },
  },
  typography: {
   useNextVariants: true,
 },
});

class AppLayout extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
    	    <div id="app">
            <Navigation />
    	      <div id="wrapper">
    	        <main id="main">
                <App />
    	        </main>
    	      </div>
    	      <footer>
    	        <p>Academic summaries</p>
    	      </footer>
    	    </div>
      	</MuiThemeProvider>
      </Router>
    )
  }
}

export default AppLayout;
