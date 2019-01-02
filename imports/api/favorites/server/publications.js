import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { Favorites } from '../favorites.js';
import { SubFavorites } from '../subfavorites.js';
import { Material } from '../../material/material.js';
import { Sources } from '../../sources/sources.js';

//favorites
Meteor.publish('favorites.user', function(username) {
check(username, String);

const user = Meteor.users.findOne({username: username});
if(!user){
  this.ready();
  return;
}

return Favorites.find({owner: user._id, private: false});
});

publishComposite('favorites.user.spesific', function(id, username) {
check(id, String);
check(username, String);

const userId = Meteor.users.findOne({username: username})._id;

return {
  find() {
    return Favorites.find({_id: id, owner: userId});
  },
  children: [
    {
      find(favorites){
        return SubFavorites.find({parent: favorites._id})
      },
      children: [
        {
          find(subfavorites){
            return Material.find({_id: subfavorites.material})
          }
        },
        {
          find(subfavorites){
            return Sources.find({_id: subfavorites.sources})
          }
        }
      ]
    }
  ]
}
});
Meteor.publish('favorites.mine', function() {
const id = this.userId;
if(!id){
  this.ready();
  return;
}
return Favorites.find({owner: id});
});

publishComposite('favorites.mine.spesific', function(id) {
check(id, String);

const userId = this.userId;
if(!userId){
  this.ready();
  return;
}

return {
  find() {
    return Favorites.find({_id: id, owner: userId});
  },
  children: [
    {
      find(favorites){
        return SubFavorites.find({parent: favorites._id})
      },
      children: [
        {
          find(subfavorites){
            return Material.find({_id: subfavorites.material})
          }
        },
        {
          find(subfavorites){
            return Sources.find({_id: subfavorites.source})
          }
        }
      ]
    }
  ]
}
});

//Sub Favorites
Meteor.publish('favorites.liked', function(materialId) {
	const userId = this.userId;
	if(!userId){
		this.ready();
		return;
	}
	return SubFavorites.find({owner: userId, material: materialId});
});
