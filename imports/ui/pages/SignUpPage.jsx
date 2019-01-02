import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SignUp from '../components/users/SignUp';

const history = createHistory();

const styles = {
	root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
	},
  button: {
    margin: '0 6px',
    width: 'fit-content'
  },
  paper: {
   padding: '12px 30px',
   margin: '12px 0',
 },
};

	// Task component - represents a single todo item
class SignUpPage extends Component {
	go = url => {
		history.push(url);
		history.go();
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
        <Paper className={classes.paper} elevation={1}>
          <Typography component="h4" variant="h4" align="center">
            Sign up
          </Typography>
          <SignUp />
        </Paper>
			</div>
		);
	}
}


SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SignUpPage);
