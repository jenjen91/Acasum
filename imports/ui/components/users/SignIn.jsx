import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/green';
import Callback from '../Callback';

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

class SignIn extends Component {
	constructor(props) {
	super(props);
		this.state = {
			message: '',
			callback: false, //Is callback open?
			variant: false, //callback: False == error, true === success
			loading: false,
			username: '',
			password: '',
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const self = this;
		const { username, password } = this.state;

		self.setState({loading: true});

		if(!username || !password ){
			const missing = !!username ? 'password' : 'username';
			this.setState({
				message: `${missing} is missing`,
				callback: true,
				variant: false,
				loading: false
			});
			return;
		}
		Meteor.loginWithPassword(username, password, function(err){
			if(err){
				self.setState({
					message: err.reason,
					callback: true,
					variant: false,
					loading: false,
				});
			}else{
				self.setState({
					message: 'you are loged in',
					callback: true,
					variant: true,
					loading: false,
				});
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
		const { username, password, loading, message, callback, variant } = this.state;
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
	            <PersonIcon />
	          </Grid>
	          <Grid item>
							<TextField
								id="username"
								label="Username or email"
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
								id="password"
								type="password"
								label="Enter Password"
								margin="normal"
								value={this.state.password}
								className={classes.input}
								onChange={event => this.setState({password: event.target.value})}
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
						<ExitToAppIcon className={classes.leftIcon} />
	            Sign in
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

export default withStyles(styles)(SignIn);
