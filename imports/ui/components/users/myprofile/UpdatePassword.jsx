import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import green from '@material-ui/core/colors/green';
import InteractiveWrapper from '../../../layouts/InteractiveWrapper';
import LoadingBtn from '../../../layouts/LoadingBtn';

const styles = theme => ({
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
});

class UpdatePassword extends Component {
	constructor(props){
		super(props);
		this.state = {
      message: '', // Callback message
      open: false, //Is callback open?
      variant: false, //callback: False == error, true === success
			password: '',
			controlPassword: '',
			showPassword: false,
		}
	}
  handleCloseSnackBar = () => ( this.setState({ open: false, }));

  callback = (message, err ) => {
    this.setState({
      message,
      open: true,
      variant: err,
      loading: false
    });
  }
	handleUpdate = event => {
		event.preventDefault();
		const self = this;
		this.setState({loading: true})

		if(this.state.password !== this.state.controlPassword){
			return this.callback('Error. Passwords must match', false);
		}
		if(this.state.password.length < 6){
			return this.callback('Error. Passwords must be atleast 6 characters', false);
		}

		Meteor.call("updatePassword", self.state.password, function(error, result){
			if(error){
				console.dir(error);
				self.callback(error.reason, false);
			} else {
				self.callback('Password sucesfully updated', true);
			}
		});
	}

	handleMouseDownPassword = event => {
    event.preventDefault();
  };

	render(){
		const { classes } = this.props;
    const { message, variant, open, loading, value } = this.state;

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
  				<Grid container spacing={8} alignItems="center">
  					<Grid item sm={5}>
  						<TextField
  							fullWidth
  							label="New password"
  							helperText="Min 6 characters"
  							margin="normal"
  							variant="outlined"
  							type={this.state.showPassword ? 'text' : 'password'}
  							value={this.state.password}
  							onChange={event => this.setState({password: event.target.value})}
  						/>
  					</Grid>
  					<Grid item sm={5}>
  						<TextField
  							fullWidth
  							label="Control Password"
  							helperText="Re-enter new password"
  							margin="normal"
  							variant="outlined"
  							type={this.state.showPassword ? 'text' : 'password'}
  							value={this.state.controlPassword}
  							onChange={event => this.setState({controlPassword: event.target.value})}
  						/>
  					</Grid>
  					<Grid item sm={2}>
  						<IconButton
  							onClick={() => this.setState({showPassword: !this.state.showPassword})}
  							onMouseDown={this.handleMouseDownPassword}
  						>
  							{this.state.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon /> }
  						</IconButton>
  					</Grid>
  				</Grid>
  				<Grid container spacing={8} alignItems="center" justify="center">
  					<Grid item>
              <LoadingBtn
                handleAction={this.handleUpdate}
                action="Set new password"
                variant={variant}
                loading={loading}
              />
  					</Grid>
  				</Grid>
        </React.Fragment>
			</InteractiveWrapper>
		)
	}
}

UpdatePassword.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UpdatePassword);
