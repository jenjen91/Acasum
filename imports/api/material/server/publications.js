import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Material } from '../material.js';

Meteor.publish('materials.user', function(username) {
	check(username, String)
	return Material.find({creator: username});
});

Meteor.publish('materials', function(id, limit) {
	return Material.find();
});

Meteor.publish("material.mine", function(){
	const id = this.userId;
	if(!id){
		this.ready();
		return;
	}
	return Material.find({owner: id}, {sort: {createdAt: -1}})
});

Meteor.publish("material.mine.single", function(id){
	check(id, String);

	const userId = this.userId;
	if(!userId){
		this.ready();
		return;
	}

	return Material.find({_id: id}, {limit: 1});
});

publishComposite('material.single', function(id) {
	check(id, String);

	return {
		find() {
			return Material.find({_id: id, published: true}, {limit: 1});
		},
		children: [
			{
				find(material){
					return Meteor.users.find({_id: material.owner}, {fields: {username: 1, profile: 1} } )
				}
			}
		]
	}
});
