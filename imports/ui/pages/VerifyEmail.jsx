import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Callback from '../components/Callback';

	// Task component - represents a single todo item
export default class VerifyEmail extends Component {
	constructor(props){
		super(props);
		this.state = {
			message: '',
			callback: false, //Is callback open?
			variant: false, //callback: False == error, true === success
		}
	}
	componentDidMount(){
		const token = this.props.match.params.token;
		const self = this;
		console.dir(this.props)
		Accounts.verifyEmail(token, function(err){
			if(err){
				self.setState({
					message: err.reason,
					callback: true,
					variant: false,
				});
			} else {
				self.setState({
					message: 'Email verified',
					callback: true,
					variant: true,
				});
				Meteor.call("afterVerifyEmail", token, (err) => {
					if(err){ console.dir(err) }
				});
			}
		});
	}
	handleClose = (event, reason) => {
    if (reason === 'clickaway') {
     return;
    }
    this.setState({ callback: false });
  };
	render() {
		const { message, callback, variant } = this.state;

		if(this.state.loading){ return <CircularProgress /> }

		return (
			<div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={callback}
					autoHideDuration={6000}
					onClose={this.handleClose}
				>
					<Callback
						onClose={this.handleClose}
						variant={variant ? 'success' : 'error'}
						message={message}
					/>
				</Snackbar>
			</div>
		);
	}
}
