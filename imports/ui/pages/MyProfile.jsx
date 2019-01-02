import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UpdateEmail from '../components/users/myprofile/UpdateEmail';
import SendVerifyEmail from '../components/users/myprofile/SendVerifyEmail';
import UpdateProfile from '../components/users/myprofile/UpdateProfile';
import UpdatePassword from '../components/users/myprofile/UpdatePassword';

const styles = theme => ({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	box: {
		[theme.breakpoints.down('md')]: {
			width: '100%',
    },
    [theme.breakpoints.up('md')]: {
			width: 500,
    },
		margin: '0 12px'
	},
	paper: {
		padding: 12,
		margin: '12px 0'
	}
});

	// Task component - represents a single todo item
class MyProfile extends Component {
	render() {
		const { classes, ready, user } = this.props;

		if(!ready){
			return( <CircularProgress /> )
		}
		return (
			<div className={classes.root}>
				 <Typography component="h5" variant="h5" align="center">
					 My Account & Profile
				 </Typography>
				 <div className={classes.wrapper}>
				 	 <div className={classes.box}>
						 <Paper className={classes.paper} elevation={1}>
							 <TextField
							 	fullWidth
				         disabled
				         id="username"
				         label="Username"
				         defaultValue={user.username}
				         margin="normal"
								 helperText="It is not possible to change your username"
				       />
						 </Paper>
						 <Paper className={classes.paper} elevation={1}>
							 <Typography component="h6" variant="h6" align="center">
								 Change Password
							 </Typography>
							 <Typography variant="overline" align="center">
								 Type inn new password twice
							 </Typography>
								<UpdatePassword password={user.emails} />
						 </Paper>
						 <Paper className={classes.paper} elevation={1}>
								<UpdateEmail emails={user.emails} />
						 </Paper>
						 <SendVerifyEmail userId={user._id} />
					 </div>

					 <div className={classes.box}>
						 <Paper className={classes.paper} elevation={1}>
							 <Typography component="h6" variant="h6" align="center">
								 Profile
							 </Typography>
							 <Typography variant="overline" align="center">
								 Profiles are optional and public
							 </Typography>
							 <UpdateProfile profile={user.profile} />
						</Paper>
					</div>
				</div>			
			</div>
		);
	}
}


MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
	user: PropTypes.object,
	ready: PropTypes.bool,
};

export default withTracker(() => {
	const ready = Meteor.subscribe('userData.private').ready();
  return {
		user: ready ? Meteor.user() : {},
		ready
  };
})(withStyles(styles)(MyProfile));
