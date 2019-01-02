import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Paper from '@material-ui/core/Paper';

import FavoriteList from './FavoriteList';
import FavoriteListNew from './FavoriteListNew';

const styles = theme => ({
	paper: {
		padding: 18
	},
  root: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: 700,
    },
    margin: '0 12px'
  },
});

class FavoriteContainer extends Component {
	render(){
		const { classes } = this.props;

		return(
      <div className={classes.root}>
        <h3>Favorite lists</h3>
        <Paper className={classes.paper}>
          <FavoriteListNew />
        </Paper>
        <br />
        <FavoriteList />
      </div>
		)
	}
}

FavoriteContainer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FavoriteContainer);
