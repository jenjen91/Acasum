import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.users.helpers({
	getRoles() {
		return Roles.getRolesForUser(this._id, 'site')
	}
});
