import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import CircularProgress from '@material-ui/core/CircularProgress';

import { routes } from './routes';
import SignInPage from '../../ui/pages/SignInPage';

class App extends Component {
	render(){
		const { userId, ready } = this.props;

		if(!ready){
			return(<CircularProgress />	)
		}

		return(
      <Switch>
          {routes.map((route, index) => {
            if(route.private && !userId){
              return(
                <Route
                  key={index}
                  path={route.path}
                  component={SignInPage}
                />
              )
            }

            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            )
          })}
        </Switch>
		)
	}
}


App.propTypes = {
	userId: PropTypes.string,
	ready: PropTypes.bool,
};

export default withTracker(() => {
	const ready = Meteor.subscribe('userData.private').ready();
  return {
		userId: ready ? Meteor.userId() : null,
		ready
  };
})(App);
