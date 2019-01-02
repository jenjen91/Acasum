import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import FavoriteContainer from '../../components/favorites/FavoriteContainer';
import SubFavorite from '../../components/favorites/SubFavorite';

export default class MyFavorites extends Component {
	render(){
		return(
			<div>
				<Switch>
					<Route exact path="/my/favorites" component={FavoriteContainer}/>
					<Route path="/my/favorites/:id" component={SubFavorite}/>
				</Switch>
			</div>
		)
	}
}
