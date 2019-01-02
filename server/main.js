import { Meteor } from 'meteor/meteor';

//Favorite
import '../imports/api/favorites/server/permissions.js';
import '../imports/api/favorites/server/publications.js';
import '../imports/api/favorites/methods.js';

//Material
import '../imports/api/material/server/permissions.js';
import '../imports/api/material/server/publications.js';
import '../imports/api/material/methods.js';

//Sources
import '../imports/api/sources/server/permissions.js';
import '../imports/api/sources/server/publications.js';
import '../imports/api/sources/methods.js';

//User Data
import '../imports/api/users/server/emailTemplate.js';
import '../imports/api/users/server/onCreateUser.js';
import '../imports/api/users/server/publications.js';
import '../imports/api/users/methods.js';

Meteor.startup(() => {
  import '../imports/startup/account-config.js';
});
