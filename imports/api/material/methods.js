import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import algoliasearch from 'algoliasearch';

import { Material } from './material.js';
import { SourceSchema } from '../sources/schema.js';
import { ReviewSchema } from './schema.js';

const { appID } = Meteor.settings.public.algolia;
const serverKey = Meteor.settings.private.algolia.serverKey;

client = algoliasearch(appID, serverKey);
indexMaterial = client.initIndex('material');

Meteor.methods({
	'material.insert.name': function(name){
		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', "You need to be logged in to insert author");
		}

		check(name, String);

		if(!name){
			throw new Meteor.Error('error', 'The name of the summary cannot be empty');
		}
		if(name < 3){
			throw new Meteor.Error('error', 'The name cannot be less than 3 characters');
		}

		const material = {name: name};
		material.owner = this.userId;
		material.creator = Meteor.users.findOne(this.userId).username;
		material.createdAt = new Date().toJSON();
		material.published = false;
		material.rating = 0;

		const insertResult = Material.insert(material, (error, result) => {
			if(error){
				throw new Meteor.Error('insert-failed', "Insert failed, contact support");
			}
			if(result){
				const newInsert = _.extend({objectID: result}, material);

				indexMaterial.addObject(newInsert).then( (res, err) => {
					if(res){ return res}
					if(err){
						throw new Meteor.Error('insert-failed', "Insert failed, contact support");
						return;
					}
				});
				return result;
			}
		});

		return insertResult;

	},
	'material.update.name': function(name, id){
		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', "You need to be logged in to insert author");
		}

		check(id, String);
		if(!id){
			throw new Meteor.Error('error', 'No ID nummber');
		}
		check(name, String);

		if(!name){
			throw new Meteor.Error('error', 'Name cannot be empty');
		}

		Material.update({_id: id}, {$set: {name: name}}, (error, result) => {
			if(error){
				throw new Meteor.Error('insert-failed', "Insert failed, contact support");
			}

			if(result){
				const newInsert = _.extend({objectID: id}, {name: name});

				indexMaterial.partialUpdateObject(newInsert).then( (res, err) => {
					if(res){ return res}
					if(err){
						throw new Meteor.Error('insert-failed', "Insert failed, contact support");
						return;
					}
				});
			}

		})
	},
	'material.update.source': function(source, id){
		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', "You need to be logged in to insert author");
		}

		check(id, String);
		if(!id){
			throw new Meteor.Error('error', 'No ID nummber');
		}

		SourceSchema.validate(source);

		if(!SourceSchema.isValid() ){
			const errors = SourceSchema.validationErrors();
			const errorField = errors[0].name;
			console.dir(errors);
			throw new Meteor.Error('error', `Error. Check ${errorField} field`);
		}

		Material.update({_id: id}, {$set: {source: source}}, (error, result) => {
			if(error){
				throw new Meteor.Error('insert-failed', "Insert failed, contact support");
			}

			if(result){
				const newInsert = _.extend({objectID: id}, {source: source});

				indexMaterial.partialUpdateObject(newInsert).then( (res, err) => {
					if(res){ return res}
					if(err){
						throw new Meteor.Error('insert-failed', "Insert failed, contact support");
						return;
					}
				});
			}

		})
	},
	'material.update.review': function(data, id){
		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', "You need to be logged in to insert author");
		}
		check(id, String);
		if(!id){
			throw new Meteor.Error('error', 'No ID nummber');
		}
		ReviewSchema.validate(data);

		if(!ReviewSchema.isValid() ){
			const errors = ReviewSchema.validationErrors();
			const errorField = errors[0].name;
			console.dir(errors);
			throw new Meteor.Error('error', `Error. Check ${errorField} field`);
		}

		Material.update({_id: id}, {$set: data}, (error, result) => {
			if(error){
				throw new Meteor.Error('insert-failed', "Insert failed, contact support");
			}

			if(result){
				const newInsert = _.extend({objectID: id}, data);

				indexMaterial.partialUpdateObject(newInsert).then( (res, err) => {
					if(res){ return res}
					if(err){
						throw new Meteor.Error('insert-failed', "Insert failed, contact support");
						return;
					}
				});
			}

		})
	},
	'material.update.summary': function(summary, id){
		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', "You need to be logged in to insert author");
		}
		check(id, String);
		if(!id){
			throw new Meteor.Error('error', 'No ID nummber');
		}
		check(summary, String);

		Material.update({_id: id}, {$set: {summary: summary}}, (error, result) => {
			if(error){
				throw new Meteor.Error('insert-failed', "Insert failed, contact support");
			}

			if(result){
				indexMaterial.partialUpdateObject({
					summary: summary,
					objectID: id,
				}).then( (res, err) => {
					if(res){ return res}
					if(err){
						throw new Meteor.Error('insert-failed', "Insert failed, contact support");
						return;
					}
				});
			}

		})
	},
	'material.update.publish': function(published, id){
		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', "You need to be logged in to insert author");
		}
		check(published, Boolean);

		check(id, String);
		if(!id){
			throw new Meteor.Error('error', 'No ID nummber');
		}

		const material = Material.findOne({_id: id});
		if(!material.summary && published){
			throw new Meteor.Error('error', 'Please insert summary before publishing');
		}

		Material.update({_id: id}, {$set: {published: published}}, (error, result) => {
			if(error){
				throw new Meteor.Error('insert-failed', "Insert failed, contact support");
			}

			if(result){
				indexMaterial.partialUpdateObject({
					published: published,
					objectID: id,
				}).then( (res, err) => {
					if(res){ return res}
					if(err){
						throw new Meteor.Error('insert-failed', "Insert failed, contact support");
						return;
					}
				});
			}

		})
	},
	'material.delete': function(ids){
		check(ids, [String]);

		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', "Access denied");
		}

		if(!ids){
			throw new Meteor.Error('error', 'No IDs');
		}

		Material.remove({_id: { $in: ids}}, (error, result) => {
			if(error){
				throw new Meteor.Error('insert-failed', "Delete failed at mongodb, contact support");
			}
			if(result){
				indexMaterial.deleteObjects(ids).then( (res, err) => {
					if(err){
						throw new Meteor.Error('insert-failed', "Delete failed at algolia, contact support");
						return;
					}
				});
			}
		});
	}
});
