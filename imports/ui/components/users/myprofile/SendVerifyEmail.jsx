import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import InteractiveWrapper from '../../../layouts/InteractiveWrapper';
import LoadingBtn from '../../../layouts/LoadingBtn';

const styles = theme => ({
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
});

class SendVerifyEmail extends Component {
	constructor(props){
		super(props);
		this.state = {
      message: '', // Callback message
      open: false, //Is callback open?
      variant: false, //callback: False == error, true === success
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
	handleSend = () => {
		const self = this;
		this.setState({ loading: true })

		Meteor.call('sendverifyemail', self.props.userId, function(err){
			if(err){
				console.dir(err)
				self.callback(err.reason, false);
			}else{
				self.callback('Verification email sent', true);
			}
		});
	}

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
          <LoadingBtn
            handleAction={this.handleSend}
            color="default"
            action="Send new verification email"
            variant={variant}
            loading={loading}
          />
        </React.Fragment>
			</InteractiveWrapper>
		)
	}
}

SendVerifyEmail.propTypes = {
	userId: PropTypes.string,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SendVerifyEmail);
