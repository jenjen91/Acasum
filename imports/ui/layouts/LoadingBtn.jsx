import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  btnwrapper: {
    margin: '24px 0',
    position: 'relative',
    width: 'fit-content',
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
});

class LoadingBtn extends Component {
	render(){
		const { classes, action, loading, variant, color } = this.props;
    const farge = color ? color : "primary"
		const buttonClassname = classNames({
			 [classes.buttonSuccess]: variant,
		 });

		return(
      <div className={classes.btnwrapper}>
        <Button
          variant="contained"
          color={farge}
          className={buttonClassname}
          disabled={loading}
          onClick={this.props.handleAction}
        >
          { action }
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
		)
	}
}

LoadingBtn.propTypes = {
	classes: PropTypes.object.isRequired,
  action: PropTypes.string,
  color: PropTypes.string,
  handleAction: PropTypes.func,
	variant: PropTypes.bool,
	loading: PropTypes.bool
}

export default withStyles(styles)(LoadingBtn);
