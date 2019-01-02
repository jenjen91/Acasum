import { Favorites } from '../favorites.js';
import { SubFavorites } from '../subfavorites.js';

Favorites.allow({
	insert(userId, doc) {
	 return userId && doc.owner === userId;
 },
 update(userId, doc, fields, modifier) {
	 return doc.owner === userId;
 },
 remove(userId, doc) {
	 return doc.owner === userId;
 },
 fetch: ['owner']
});

SubFavorites.allow({
  insert(userId, doc) {
   return userId && doc.owner === userId;
 },
 update(userId, doc, fields, modifier) {
   return doc.owner === userId;
 },
 remove(userId, doc) {
   return doc.owner === userId;
 },
 fetch: ['owner']
});
