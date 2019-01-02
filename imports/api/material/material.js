import { Mongo } from 'meteor/mongo';

export const Material = new Mongo.Collection('material');

Material.helpers({
	user() {
		return Meteor.users.findOne(this.owner)
	}
});
