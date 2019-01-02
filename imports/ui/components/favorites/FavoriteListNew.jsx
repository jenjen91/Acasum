import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { Favorites } from '../../../api/favorites/favorites.js';

import InteractiveWrapper from '../../layouts/InteractiveWrapper';
import GridInputBtn from '../../layouts/GridInputBtn';
import LoadingBtn from '../../layouts/LoadingBtn';

const styles = {
	wrap: {
		display: 'flex',
		alignItems: 'baseline'
	},
	input: {
		flex: 1,
		marginRight: 6
	}
}

class FavoriteListNew extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: '',
			message: '', // Callback message
			open: false, //Is callback open?
			variant: false, //callback: False == error, true === success
			loading: false,
		}
	}
	callback = (message, err ) => {
		this.setState({
			message,
			variant: err,
			open: true,
			loading: false
		});
	}
	handleSubmit = () => {
		const self = this;
		this.setState({ loading: true });

		Favorites.insert({owner: Meteor.userId(), name: self.state.value, private: false}, (err, result) => {
			if(err){
				self.callback(err.reason, false);
			}else{
				self.callback('List sucefully created', true);
				this.setState({ value: '' });
			}
		});
	}
	handleCloseSnackBar = () => ( this.setState({ open: false, }));

	render(){
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
			<GridInputBtn
				left={
					<TextField
						fullWidth
						id="name"
						label="New list"
						type="email"
						variant="outlined"
						margin="normal"
						value={value}
						helperText="Type name of new list"
						onChange={event => this.setState({value: event.target.value})}
					/>
				}
				right={
					<LoadingBtn
						handleAction={this.handleSubmit}
						action="Create new list"
						variant={variant}
						loading={loading}
					/>
				}
			/>
			</InteractiveWrapper>
		)
	}
}

export default FavoriteListNew;
