import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import createHistory from 'history/createBrowserHistory';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import Callback from '../Callback';
import FavoriteListItem from './FavoriteListItem';
import FavoriteListNew from './FavoriteListNew.jsx';
import red from '@material-ui/core/colors/red';
import { Favorites } from '../../../api/favorites/favorites.js';
import { SubFavorites } from '../../../api/favorites/subfavorites.js';

const history = createHistory();

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
});

class FavoriteList extends Component {
	constructor(props){
		super(props);
		this.state = {
			dialog: false,
			selectedItem: '',
			checked: '',
      message: '', // Callback message
			callback: false, //Is callback open?
			variant: false, //callback: False == error, true === success
			loading: false,
		}
	}
  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
     return;
    }
    this.setState({ callback: false });
  };
  callback = (message, err ) => {
		this.setState({
			message: message,
			callback: true,
			variant: err,
			loading: false,
		});
	}
	onChecked = (item) => {
		//this.setState({checked: id})
		const self = this;
		Favorites.update({_id: item._id}, {$set: {private: !item.private}}, (err, result) => {
			if(err){
        self.callback(err.reason, false);
			}else{
        const message = !item.private ? `${item.name} is private` : `${item.name} is public`;
        self.callback(message, true);
			}
		});
	}
	openDialog = item => {
		this.setState({
			dialog: true,
			selectedItem: item
		})
	}
	handleDelete = () => {
		const item = this.state.selectedItem;
		const self = this;
		Meteor.call("favorite.delete", item._id, function(err){
			if(err){
        self.callback(err.reason, false);
			} else {
        self.callback(`${item.name} is deleted`, true);
			}
      self.setState({ dialog: false });
		});
	}
	render(){
		const { classes, ready, favorites } = this.props;
    const { message, callback, variant, loading } = this.state;

		return(
			<div>
				<Paper className={classes.paper}>
					<FavoriteListNew handleCallback={this.callback}  />
				</Paper>
				<br />
				<br />
				<h1>Favorites</h1>
				<Paper className={classes.paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding="checkbox">Private</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Delete</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ready ? favorites.map((item) => (
                <FavoriteListItem key={item._id} item={item} openDialog={this.openDialog} onChecked={this.onChecked}/>
              )) : null }
						</TableBody>
					</Table>
					{ready ? null : <CircularProgress /> }
				</Paper>

				<Dialog
					open={this.state.dialog}
					onClose={() => this.setState({dialog: false})}
				>
					<DialogTitle>{"Delete this list?"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete <b>{this.state.selectedItem.name}</b>?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDelete} className={classes.btn}>
							Yes, delete
						</Button>
						<Button onClick={() => this.setState({dialog: false})} variant="outlined">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>

        <Snackbar
  				anchorOrigin={{
  					vertical: 'bottom',
  					horizontal: 'left',
  				}}
  				open={callback}
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


FavoriteList.propTypes = {
	favorites: PropTypes.array,
	ready: PropTypes.bool,
	classes: PropTypes.object.isRequired
};

export default withTracker(() => {
	const favorites = Meteor.subscribe('favorites.mine');

	return {
		favorites: Favorites.find().fetch(),
		ready: favorites.ready(),
	}
})(withStyles(styles)(FavoriteList));
