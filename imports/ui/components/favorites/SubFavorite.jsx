import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';
import { Favorites } from '../../../api/favorites/favorites.js';
import { SubFavorites } from '../../../api/favorites/subfavorites.js';
import InteractiveWrapper from '../../layouts/InteractiveWrapper';

const history = createHistory();

const styles = {
	paper: {
		padding: 18
	}
}

class SubFavorite extends Component {
	constructor(props){
		super(props);
		this.state = {
			callback: {
				message: '', // Callback message
				open: false, //Is callback open?
				variant: false, //callback: False == error, true === success
			},
			dialog: false,
			selectedItem: {}
		}
	}
	handleclick = () => {
		this.setState({
			message: 'gooo',
			open: true,
			variant: true,
		})
	}
	
	handleCloseSnackBar = () => ( this.setState({ open: false, }));

	render(){
		console.dir(this)
		const { message, variant, open, loading } = this.state;
		return(
			<InteractiveWrapper
				handleCloseSnackBar={this.handleCloseSnackBar}
				message={message}
				variant={variant}
				open={open}
				dialog={false}
				item={{}}
			>
				<p onClick={this.handleclick}>hello</p>
			</InteractiveWrapper>
		)
	}
}

SubFavorite.propTypes = {
	favorite: PropTypes.object.isRequired,
	subfavorites: PropTypes.arrayOf(PropTypes.object).isRequired,
	ready: PropTypes.bool.isRequired,
	classes: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default withTracker(({match}) => {
	const id = match.params.id;
	const handle = Meteor.subscribe('favorites.mine.spesific', id);
	const ready = handle.ready();
	const favorite = Favorites.findOne(id);
	const subfavorites = SubFavorites.find({parent: id});
	const favExists = ready && !!favorite;
	const subfavExists = ready && !!subfavorites;

	return {
		ready,
		favorite: favExists ? favorite : {},
		subfavorites: subfavExists ? SubFavorites.find({parent: id}).fetch() : [],
	}
})(withStyles(styles)(SubFavorite));
