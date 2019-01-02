import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import createHistory from 'history/createBrowserHistory';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const history = createHistory();

const styles = {
	logo: {
		margin: '0 auto',
		display: 'block'
	},
	imgparagraph: {
		margin: '12px auto',
		width: 400,
		display: 'block'
	},
	button: {
		margin: 6,
	},
	btnwrapper: {
		display: 'flex',
		justifyContent: 'center'
	}
};

	// Task component - represents a single todo item
class Home extends Component {
	go = url => {
		history.push(url);
		history.go();
	};

	renderBtns = () => {
		const { classes } = this.props;
		return (
			<div className={classes.btnwrapper}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() => this.go('/sign-in')}
					>
					<ExitToAppIcon />
					Sign in
				</Button>
				<Button
					variant="contained"
					color="secondary"
					className={classes.button}
					onClick={() => this.go('/sign-up')}
					>
					<PersonAddIcon />
					Sign up
				</Button>
			</div>
		);
	}

	render() {
		const { classes, userId, ready } = this.props;

		return (
			<div id="home">
				<img className={classes.logo} src='/images/acasum-logo.png' />
				<img className={classes.imgparagraph} src='/images/centered-paragraph.png' />


				{!ready ? <CircularProgress /> : userId ? ' ' : this.renderBtns() }
			</div>
		);
	}
}


Home.propTypes = {
  classes: PropTypes.object.isRequired,
	userId: PropTypes.string,
	ready: PropTypes.bool,
};


export default withTracker(() => {
	const ready = Meteor.subscribe('userData.private').ready();
  return {
		userId: ready ? Meteor.userId() : null,
		ready
  };
})(withStyles(styles)(Home));
