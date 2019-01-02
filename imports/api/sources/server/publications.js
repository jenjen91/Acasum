import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Sources } from '../sources.js';

Meteor.publish('sources', function(id, limit) {
		return Sources.find();
	});

	publishComposite('sources.single', function(id) {
		check(id, String);

		return {
			find() {
				return Sources.find({_id: id});
			},
			children: [
				{
					find(source){
						return Material.find({'source.objectID': source._id, published: true})
					}
				}
			]
		}
	});
