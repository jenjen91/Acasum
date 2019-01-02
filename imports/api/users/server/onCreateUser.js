import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '../../favorites/favorites.js';

Accounts.onCreateUser(function(options, user){
	user.reviews = [];
	user.profile = {
		firstname: '',
		lastname: '',
		avatar: '/images/avatar.png',
		bio: ''
	}

	Roles.addUsersToRoles(user._id, 'pending', 'site'); //status changes when email verified

	Favorites.insert({owner: user._id, name: 'default', private: false});

	return user;
});
