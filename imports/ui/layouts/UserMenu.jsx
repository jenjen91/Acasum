import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SubjectIcon from '@material-ui/icons/Subject';
import PortraitIcon from '@material-ui/icons/Portrait';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class UserMenu extends Component {
  handleLogOut = () => {
    Meteor.logout();
    this.props.handleUserMenuClose();
  };
  go = url => {
    history.push(url);
    history.go();
  };
	render(){
		const { userId, ready, anchorEl } = this.props;
    const isUserMenuOpen = Boolean(anchorEl);

    if(!ready){
      return null;
    }
    if(!userId){
      return(
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isUserMenuOpen}
        onClose={this.props.handleUserMenuClose}
        >
          <MenuItem onClick={() => this.go('/sign-in')}>
            <ListItemIcon>
               <ExitToAppIcon />
             </ListItemIcon>
             <ListItemText inset primary="Sign In" />
          </MenuItem>
          <MenuItem onClick={() => this.go('/sign-up')}>
            <ListItemIcon>
              <PersonAddIcon />
             </ListItemIcon>
             <ListItemText inset primary="Sign Up" />
          </MenuItem>
        </Menu>
      )
    }
		return(
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isUserMenuOpen}
      onClose={this.handleUserMenuClose}
      >
        <MenuItem onClick={() => this.go('/my/profile')}>
          <ListItemIcon>
             <PortraitIcon />
           </ListItemIcon>
           <ListItemText inset primary="My Profile" />
        </MenuItem>
        <MenuItem onClick={() => this.go('/my/summaries')}>
          <ListItemIcon>
             <SubjectIcon />
           </ListItemIcon>
           <ListItemText inset primary="My Summaries" />
        </MenuItem>
        <MenuItem onClick={() => this.go('/my/favorites')}>
          <ListItemIcon>
             <FavoriteIcon />
           </ListItemIcon>
           <ListItemText inset primary="My Favorites" />
        </MenuItem>
        <MenuItem onClick={this.handleLogOut}>
          <ListItemIcon>
             <PowerSettingsNew color="error" />
           </ListItemIcon>
           <ListItemText inset primary="Log out" />
        </MenuItem>
      </Menu>
		)
	}
}


UserMenu.propTypes = {
	userId: PropTypes.string,
	ready: PropTypes.bool,
	anchorEl: PropTypes.object,
  handleUserMenuClose: PropTypes.func
};

export default withTracker(() => {
	const ready = Meteor.subscribe('userData.private').ready();
  return {
		userId: ready ? Meteor.userId() : null,
		ready
  };
})(UserMenu);
