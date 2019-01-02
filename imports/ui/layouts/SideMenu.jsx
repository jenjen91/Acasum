import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Subject from '@material-ui/icons/Subject';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ExplicitIcon from '@material-ui/icons/Explicit';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

const styles = {
  list: {
    width: 250,
  },
};

class SideMenu extends Component {
  go = url => {
    history.push(url);
    history.go();
  };
  render(){
    const { classes } = this.props;

    return (
      <div className={classes.list}>
        <List>
          <ListItem button onClick={() => this.go('/material')}>
            <ListItemIcon>
              <Subject />
            </ListItemIcon>
            <ListItemText primary="Summaries" />
          </ListItem>
          <ListItem button onClick={() => this.go('/my/summaries/add')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Summaries" />
          </ListItem>
          <ListItem button onClick={() => this.go('/material/SvYRuamuxxyD67xTt')}>
            <ListItemIcon>
              <ExplicitIcon />
            </ListItemIcon>
            <ListItemText primary="Example Summary" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => this.go('/my/profile')}>
            <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
             <ListItemText inset primary="My Profile" />
          </ListItem>
          <ListItem onClick={() => this.go('/my/summaries')}>
            <ListItemIcon>
               <Subject />
             </ListItemIcon>
             <ListItemText inset primary="My Summaries" />
          </ListItem>
          <ListItem onClick={() => this.go('/my/favorites')}>
            <ListItemIcon>
               <FavoriteIcon />
             </ListItemIcon>
             <ListItemText inset primary="My Favorites" />
          </ListItem>
          <ListItem onClick={this.handleLogOut}>
            <ListItemIcon>
               <ExitToApp />
             </ListItemIcon>
             <ListItemText inset primary="Log out" />
          </ListItem>
        </List>
      </div>
    )
  }
}

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);
