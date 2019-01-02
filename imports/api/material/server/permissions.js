import { Material } from '../material.js';

Material.allow({
  insert(userId, doc){
    // The user must be logged in and the document must be owned by the user.
    return udserId && doc.owner === userId;
  },
  update(userId, doc, fields, modifier) {
  // Can only change your own documents.
  return doc.owner === userId;
},
remove(userId, doc) {
  // Can only remove your own documents.
  return doc.owner === userId;
},
fetch: ['owner']
});
