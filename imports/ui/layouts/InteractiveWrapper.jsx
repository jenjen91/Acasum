import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import red from '@material-ui/core/colors/red';
import Callback from '../components/Callback';

const styles = theme => ({
	paper: {
		padding: 18
	},
	btn: {
		color: theme.palette.getContrastText(red[500]),
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700],
		},
	},
  wrapper: {
		[theme.breakpoints.down('md')]: {
			width: '100%',
    },
    [theme.breakpoints.up('md')]: {
			width: 500,
    },
  }
});

class InteractiveWrapper extends Component {
	constructor(props){
		super(props);
		this.state = {
			dialog: false,
		}
	}
  componentDidUpdate(prevProps) {
    const { dialog, item } = this.props;

    if ( dialog !== prevProps.dialog) {
      this.setState({ dialog: dialog });
    }
  }
  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
     return;
    }
    this.props.handleCloseSnackBar();
  };

	render(){
		const { classes, children, item, message, open, variant } = this.props;
    const { dialog } = this.state;

		return(
			<div>
				{ children }

				<Dialog
					open={this.state.dialog}
					onClose={this.props.handleDialClose}
				>
					<DialogTitle>{"Delete this list?"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete <b>{item.name}</b>?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
            <Button onClick={this.props.dialogAction} className={classes.btn}>
              Yes, delete
            </Button>
            <Button onClick={this.props.handleDialClose} variant="outlined">
              Cancel
            </Button>
					</DialogActions>
				</Dialog>

        <Snackbar
  				anchorOrigin={{
  					vertical: 'bottom',
  					horizontal: 'left',
  				}}
  				open={open}
  				autoHideDuration={6000}
  				onClose={this.handleCloseSnackBar}
  			>
  				<Callback
  					onClose={this.handleCloseSnackBar}
  					variant={variant ? 'success' : 'error'}
  					message={message}
  				/>
  			</Snackbar>
			</div>
		)
	}
}


InteractiveWrapper.propTypes = {
	classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  variant: PropTypes.bool,
  open: PropTypes.bool,
  message: PropTypes.string,
  dialog: PropTypes.bool,
  item: PropTypes.object,
  handleCloseSnackBar: PropTypes.func,
  handleDialClose: PropTypes.func,
  dialogAction: PropTypes.func,
};

export default withStyles(styles)(InteractiveWrapper);
