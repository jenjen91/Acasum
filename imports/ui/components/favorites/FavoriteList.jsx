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
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import { Favorites } from '../../../api/favorites/favorites.js';
import InteractiveWrapper from '../../layouts/InteractiveWrapper';

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
			selectedItem: {},
			checked: '',
			message: '', // Callback message
			open: false, //Is callback open?
			variant: false, //callback: False == error, true === success
		}
	}
	go = url => {
		history.push(url)
		history.go()
	}
  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
     return;
    }
    this.setState({ open: false });
  };
  callback = (message, err ) => {
		this.setState({
			message: message,
			variant: err,
			open: true
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
	handleDialog = item => {
		this.setState({ dialog: true, selectedItem: item });
	}
	handleDialClose = () => {
		this.setState({ dialog: false });
	}
	handleCloseSnackBar = () => ( this.setState({ open: false, }));

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
    const { message, variant, open, dialog, selectedItem } = this.state;
		if(!ready){ return <CircularProgress /> }

		return(
			<InteractiveWrapper
				handleCloseSnackBar={this.handleCloseSnackBar}
				message={message}
				variant={variant}
				open={open}
				dialog={dialog}
				item={selectedItem}
				handleDialClose={this.handleDialClose}
				dialogAction={this.handleDelete}
			>
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
							{favorites.map((item) => (
								<TableRow key={item._id}>
				          <TableCell padding="checkbox">
				            <Checkbox
				              checked={item.private}
				              onChange={() => this.onChecked(item)}
				            />
				          </TableCell>
				          <TableCell onClick={() => this.go(`/my/favorites/${item._id}`)}>
				            <a href={`/my/favorites/${item._id}`}>{item.name}</a>
				          </TableCell>
				          <TableCell>
				            <Button
				              variant="contained"
											className={classes.btn}
				              onClick={() => this.handleDialog(item)}
				            >
											<DeleteIcon />
				              Delete
				            </Button>
				          </TableCell>
				        </TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			</InteractiveWrapper>
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
