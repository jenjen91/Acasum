import { Mongo } from 'meteor/mongo';
import { Material } from '../material/material.js';

export const SubFavorites = new Mongo.Collection('subfavorites');

SubFavorites.helpers({
	getMaterial() {
		return Material.findOne(this.material)
	}
});
