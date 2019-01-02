import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import InteractiveWrapper from '../../../layouts/InteractiveWrapper';
import LoadingBtn from '../../../layouts/LoadingBtn';

const styles = theme => ({
	bigAvatar: {
		 margin: 10,
		 width: 60,
		 height: 60,
 	},
});

class UpdateProfile extends Component {
	constructor(props){
		super(props);
		this.state = {
			message: '', // Callback message
			open: false, //Is callback open?
			variant: false, //callback: False == error, true === success
			loading: false,
			avatar: '',
			bio: '',
			firstname: '',
			lastname: '',
		}
	}
	componentDidMount(){
		const { avatar, bio, firstname, lastname } = this.props.profile;
		this.setState({ avatar, bio, firstname, lastname });
	}
	callback = (message, err ) => {
		this.setState({
			message,
			open: true,
			variant: err,
			loading: false
		});
	}
	handleUpdate = () => {
		const { avatar, bio, firstname, lastname } = this.state;
		const self = this;
		this.setState({ loading: true })

		Meteor.call('updateProfile', avatar, bio, firstname, lastname, function(err){
			if(err){
				console.dir(err)
				self.callback(err.reason, false);
			}else{
				self.callback('Profile updated', true);
			}
		});
	}

	handleCloseSnackBar = () => ( this.setState({ open: false, }));

	render(){
		const { classes } = this.props;
		const { message, variant, open, loading } = this.state;

		return(
			<InteractiveWrapper
				handleCloseSnackBar={this.handleCloseSnackBar}
				message={message}
				variant={variant}
				open={open}
				dialog={false}
				item={{}}
			>
				<React.Fragment>
					<Grid container spacing={8} alignItems="flex-end">
						<Grid item sm={9}>
							<TextField
								fullWidth
								id="avatar"
								label="Avatar"
								margin="normal"
								value={this.state.avatar}
								onChange={event => this.setState({avatar: event.target.value})}
							/>
						</Grid>
						<Grid item sm={3}>
							<Avatar alt="avatar" src={this.state.avatar} className={classes.bigAvatar} />
						</Grid>
					</Grid>
					<Grid container spacing={8} alignItems="flex-end">
						<Grid item sm={6}>
							<TextField
								fullWidth
								id="firstname"
								label="First Name"
								margin="normal"
								variant="outlined"
								value={this.state.firstname}
								onChange={event => this.setState({firstname: event.target.value})}
							/>
						</Grid>
						<Grid item sm={6}>
							<TextField
								fullWidth
								id="lastname"
								label="Lat Name"
								margin="normal"
								variant="outlined"
								value={this.state.lastname}
								onChange={event => this.setState({lastname: event.target.value})}
							/>
						</Grid>
					</Grid>
					<TextField
						fullWidth
						id="bio"
						label="Bio"
						margin="normal"
						variant="outlined"
						multiline
						rows="5"
						value={this.state.bio}
						helperText="Who are you?"
						onChange={event => this.setState({bio: event.target.value})}
					/>
					<LoadingBtn
						handleAction={this.handleUpdate}
						action="Update Profile"
						variant={variant}
						loading={loading}
					/>
				</React.Fragment>
			</InteractiveWrapper>
		)
	}
}

UpdateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UpdateProfile);
