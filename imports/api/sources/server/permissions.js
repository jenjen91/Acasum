import { Sources } from '../sources.js';
import { Roles } from 'meteor/alanning:roles';

Sources.allow({
  insert(userId){
    //return true if user is admin
    return userId
  },
  update(userId) {
    return Roles.userIsInRole(userId, ['admin'], 'site');
  },
  remove(userId, doc) {
    return Roles.userIsInRole(userId, ['admin'], 'site');
  }
});
