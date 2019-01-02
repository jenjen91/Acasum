import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import algoliasearch from 'algoliasearch';

import { Sources } from './sources';
import { SourceSchema } from './schema';

const { serverKey } = Meteor.settings.private.algolia;
const { appID } = Meteor.settings.public.algolia;
client = algoliasearch(appID, serverKey);
indexSources = client.initIndex('source');

Meteor.methods({
	'source.insert': function (data) {
		if (!this.userId) {
			throw new Meteor.Error('not-logged-in', 'You need to be logged in to insert source');
		}

		SourceSchema.validate(data);

		if (!SourceSchema.isValid()) {
			const errors = SourceSchema.validationErrors();
			const errorField = errors[0].name;
			throw new Meteor.Error('error', `Error. Check ${errorField} field`);
		}

		const insertResult = Sources.insert(data, (error, result) => {
			if (error) {
				throw new Meteor.Error('insert-failed', 'Insert failed, contact support');
			}

			if (result) {
				const newInsert = _.extend({ objectID: result }, data);

				indexSources.addObject(newInsert).then((res, err) => {
					if (res) { return res; }
					if (err) {
						throw new Meteor.Error('insert-failed', 'Insert failed, contact support');
					}
				});
				return result;
			}
		});

		return insertResult;
	},
	'source.update': function(data, id) {
		check(id, String);

		const { userId } = this;

		if (!userId) {
			throw new Meteor.Error('not-logged-in', 'You need to be logged in to update source');
		}

		if (!Roles.userIsInRole(userId, ['admin'], 'site')) {
			throw new Meteor.Error('no-access', 'You need special access to update a source');
		}

		SourceSchema.validate(data);

		if (!SourceSchema.isValid()) {
			const errors = SourceSchema.validationErrors();
			const errorField = errors[0].name;
			throw new Meteor.Error('error', `Error. Check ${errorField} field`);
		}

		Sources.update({_id: id }, { $set: data }, (error) => {
			if (error) {
				throw new Meteor.Error('insert-failed', 'Insert failed, contact support');
			} else {
				const newInsert = _.extend({ objectID: id }, data);

				indexSources.partialUpdateObject(newInsert).then((res, err) => {
					if (res) { return res; }
					if (err) {
						throw new Meteor.Error('insert-failed', 'Insert failed, contact support');
					}
				});
			}
		});
	},
});
