import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Favorites } from './favorites.js';
import { SubFavorites } from './subfavorites.js';

Meteor.methods({
	'favorite.delete':function(id){
		 check(id, String);

		 const userId = this.userId;

		return Favorites.remove(id, (err, res) => {
			 console.dir(res)
 			if(res){
 				return SubFavorites.remove({parent: id, owner: userId})
 			}
 		})
	}
});
