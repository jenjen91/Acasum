import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import createHistory from 'history/createBrowserHistory';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EmailIcon from '@material-ui/icons/Email';
import RepeatIcon from '@material-ui/icons/Repeat';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/green';
import Callback from '../Callback';

const history = createHistory();

const styles = theme => ({
	input: {
		width: 260,
	},
  btnwrapper: {
    margin: '24px 0',
    position: 'relative',
    width: 'fit-content',
  },
	button: {
		width: 300,
	},
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
});

class SignUp extends Component {
	constructor(props) {
	super(props);
		this.state = {
			message: '',
			callback: false, //Is callback open?
			variant: false, //callback: False == error, true === success
			loading: false,
			username: '',
			email: '',
			password: '',
			controlPassword: '',
			error: {
				email: false,
				username: false,
				password: false,
				controlPassword: false,
			}
		};
	}
	handleError = (message, error) => {
		this.setState({
			message: message,
			callback: true,
			variant: false,
			loading: false,
			error
		});
	}
	handleSubmit = (e) => {
		e.preventDefault();

		const self = this;
		const { email, username, password, controlPassword } = this.state;
		let missing;
		let error = {
			email: false,
			username: false,
			password: false,
			controlPassword: false
		}

		self.setState({loading: true});

		//Check if all fields are filled out
		if(!email || !username || !password || !controlPassword){
			_.map(
				{email, username, password, controlPassword},
				(val, key) => {
					if(!val){
						missing = missing ? (missing + ' & ' + key) : key;
						error[key] = true;
					}
				}
			);
			return this.handleError(`${missing} is missing`, error)
		}

		if(password !== controlPassword){
			error.controlPassword = true;
			return this.handleError("Password does not match", error)
		}

		if(password.length < 6){
			error.password = true;
			return this.handleError("Passwords must be at least 6 characters", error)
		}

		Accounts.createUser({email, username, password}, function(err){
			if(err){
				console.dir(err)
				self.handleError(err.reason, error);
			}	else {
				history.push('/my/profile');
				history.go();
		}
	});
	};

	handleClose = (event, reason) => {
	 if (reason === 'clickaway') {
		 return;
	 }

	 this.setState({ callback: false });
 };

	render(){
		const { error, loading, message, callback, variant } = this.state;
		const { classes } = this.props;
		const buttonClassname = classNames({
       [classes.buttonSuccess]: variant,
			 [classes.button]: true,
     });

		return (
			<div>
				<form autoComplete="on">
					<Grid container spacing={8} alignItems="flex-end">
	          <Grid item>
	            <EmailIcon />
	          </Grid>
	          <Grid item>
							<TextField
								required
								error={error.email}
								id="email"
								label="Email"
								margin="normal"
								value={this.state.email}
								className={classes.input}
								onChange={event => this.setState({email: event.target.value})}
							/>
	          </Grid>
	          <Grid item>
	            <PersonIcon />
	          </Grid>
	          <Grid item>
							<TextField
								required
								error={error.username}
								id="username"
								label="Username"
								margin="normal"
								value={this.state.username}
								className={classes.input}
								onChange={event => this.setState({username: event.target.value})}
							/>
	          </Grid>
	        </Grid>

					<Grid container spacing={8} alignItems="flex-end">
	          <Grid item>
	            <LockIcon />
	          </Grid>
	          <Grid item>
							<TextField
								required
								error={error.password}
								id="password"
								type="password"
								label="Enter Password"
								helperText="Min 6 characters"
								margin="normal"
								value={this.state.password}
								className={classes.input}
								onChange={event => this.setState({password: event.target.value})}
							/>
	          </Grid>
	          <Grid item>
	            <RepeatIcon />
	          </Grid>
	          <Grid item>
							<TextField
								required
								error={error.controlPassword}
								id="control-password"
								type="password"
								label="Control Password"
								helperText="Re-enter password"
								margin="normal"
								value={this.state.controlPassword}
								className={classes.input}
								onChange={event => this.setState({controlPassword: event.target.value})}
							/>
	          </Grid>
	        </Grid>
					<div className={classes.btnwrapper}>
	          <Button
	            variant="contained"
	            color="primary"
	            className={buttonClassname}
	            disabled={loading}
	            onClick={this.handleSubmit}
	          >
						<PersonAddIcon className={classes.leftIcon} />
	            Sign up
	          </Button>
	          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
	      </div>
			</form>

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

export default withStyles(styles)(SignUp);
