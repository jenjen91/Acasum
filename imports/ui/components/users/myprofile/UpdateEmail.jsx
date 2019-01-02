import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InteractiveWrapper from '../../../layouts/InteractiveWrapper';
import GridInputBtn from '../../../layouts/GridInputBtn';
import LoadingBtn from '../../../layouts/LoadingBtn';

const styles = theme => ({
	input: {
		width: 260,
	},
});

class UpdateEmail extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: '',
			message: '', // Callback message
			open: false, //Is callback open?
			variant: false, //callback: False == error, true === success
			loading: false,
		}
	}
	componentDidMount(){
		const { emails } = this.props;
		const email = emails.length ? emails[0] : {};
		this.setState({ value: email.address ? email.address : ''});
	}
	callback = (message, err ) => {
		this.setState({
			message,
			variant: err,
			open: true,
			loading: false
		});
	}
	handleUpdate = value => {
		const self = this;
		if(!value){
			return this.callback('Email is missing', false);
		}
		this.setState({ loading: true });

		Meteor.call("updateEmail", value, function(err){
			if(err){
				console.dir(err);
				self.callback(err.reason, false);
			} else {
				self.callback('Email sucesfully updated. Check your inbox to varify your new email', true);
			}
		});
	}

	handleCloseSnackBar = () => ( this.setState({ open: false, }));

	render(){
		const { message, variant, open, loading, value } = this.state;
		const { classes, emails } = this.props;

		const email = emails.length ? emails[0] : {};
		const helperText = `Is email verified ? ${email.verified ? 'Yes' : 'No'}`;

		return(
			<InteractiveWrapper
				handleCloseSnackBar={this.handleCloseSnackBar}
				message={message}
				variant={variant}
				open={open}
				dialog={false}
				item={{}}
			>
			<GridInputBtn
				left={
					<TextField
						fullWidth
						id="name"
						label="New list"
						type="email"
						variant="outlined"
						margin="normal"
						value={value}
						label="Email"
						helperText={helperText}
						onChange={event => this.setState({value: event.target.value})}
					/>
				}
				right={
					<LoadingBtn
						handleAction={this.handleUpdate}
						action="Update"
						variant={variant}
						loading={loading}
					/>
				}
			/>
			</InteractiveWrapper>
		)
	}
}

UpdateEmail.propTypes = {
	emails: PropTypes.array,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UpdateEmail);
