import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Material } from '../../material/material.js';

Meteor.publish("userData.public", function (username) {
	check(username, String);

	const options = {
		fields: {
			username: 1,
			createdAt: 1,
			profile: 1,
		},
		sort: {createdAt: -1}
	};
	return Meteor.users.find({username: username}, options);

});

Meteor.publish("userData.admin", function () {

		if (!this.userId) {
		return this.ready();
	}
	/*
	if (!Roles.userIsInRole(this.userId, ['admin'], 'site') ) {
	return this.ready();
}*/

	return Meteor.users.find({}, {
		fields: {
			username: 1,
			emails: 1,
			createdAt: 1,
			profile: 1,
			roles: 1
		},
		sort: {createdAt: -1}
	});
});

publishComposite('userData.single', function(username) {
	check(username, String);

	return {
		find() {
			return Meteor.users.find({username: username}, {fields: {username: 1, profile: 1} });
		},
		children: [
			{
				find(user){
					return Material.find({owner: user._id, published: true})
				}
			}
		]
	}
});


Meteor.publish("userData.private", function () {
	if (!this.userId) {
		 return this.ready();
	 }

	const options = {
		fields: {
			username: 1,
			emails: 1,
			createdAt: 1,
			profile: 1,
			roles: 1
		},
		limit: 1
	};
	return Meteor.users.find({_id: this.userId}, options);

});
