import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import createHistory from 'history/createBrowserHistory';

import UserMenu from './UserMenu';
import SideMenu from './SideMenu';

const history = createHistory();

const styles = {
  root: {
    flexGrow: 1,
  },
  bar: {
    justifyContent: 'space-between'
  },
  title: {
    color: '#FFF'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navigation extends Component {
  constructor(props){
		super(props);
		this.state = {
      anchorEl: null,
      menuOpen: false,
		}
	}
  go = url => {
    history.push(url);
    history.go();
  };
  handleUserMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleUserMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuOpen = () => {
    const menuOpen = this.state.menuOpen;
    this.setState({ menuOpen: !menuOpen });
  };
  toggleDrawer = (open) => () => {
    this.setState({
    menuOpen: open,
    });
  };
  render(){
    const { classes } = this.props;
    const { menuOpen, anchorEl } = this.state;
    const isUserMenuOpen = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.bar}>
            <IconButton className={classes.menuButton} onClick={this.handleMenuOpen} color="inherit" aria-label="Menu">
              { menuOpen ? <CloseIcon /> : <MenuIcon /> }
            </IconButton>
            <Button className={classes.title} onClick={() => this.go('/')}>
              AcaSum
            </Button>
            <div>
              <IconButton
               onClick={() => this.go('/material')}
               color="inherit"
             >
               <LibraryBooksIcon />
             </IconButton>
             <IconButton
               onClick={() => this.go('/my/summaries/add')}
               color="inherit"
             >
               <AddIcon />
             </IconButton>
              <IconButton
               aria-owns={isUserMenuOpen ? 'material-appbar' : undefined}
               aria-haspopup="true"
               onClick={this.handleUserMenuOpen}
               color="inherit"
             >
               <AccountCircle />
             </IconButton>
           </div>
          </Toolbar>
        </AppBar>

        <UserMenu anchorEl={anchorEl} handleUserMenuClose={this.handleUserMenuClose} />

        <SwipeableDrawer
          open={menuOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <SideMenu />
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  userId: PropTypes.string,
};

export default withStyles(styles)(Navigation);
