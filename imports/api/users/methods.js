import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
	afterVerifyEmail: function(token){
		check(token, String);

		const current = this.userId;

		Roles.addUsersToRoles(current, 'standard', 'site');
	},
	deleteUser: function(id){
		check(id, String);

		const current = this.userId;

		if(id !== current && !Roles.userIsInRole(current, ['admin'], 'site') ){
			throw new Meteor.Error(403, "Access denied")
		}

		Meteor.users.remove(id);

	},
	sendverifyemail: function(id){
		check(id, String);

		const current = this.userId;

		if(id !== current && !Roles.userIsInRole(current, ['admin'], 'site') ){
			throw new Meteor.Error(403, "Access denied")
		}

		Accounts.sendVerificationEmail(id)

	},
	updateRoles: function (targetUserId, roles) {
		check(targetUserId, String);
		check(roles, String);

	 var current = Meteor.user()

	 if (current !== targetUserId && !Roles.userIsInRole(current, ['admin'], 'site') ) {
		 throw new Meteor.Error(403, "Access denied")
	 }

	 if(roles === 'admin'){
		 Roles.removeUsersFromRoles(targetUserId, 'standard', 'site');
		 Roles.setUserRoles(targetUserId, 'admin', 'site')
	 }

	 if(roles === 'standard'){
		 Roles.removeUsersFromRoles(targetUserId, 'admin', 'site');
		 Roles.setUserRoles(targetUserId, 'standard', 'site');
	 }

 },
 updateEmail: function(newEmail){
	 check(newEmail, String);

		if(!this.userId){
			throw new Meteor.Error(403, "Access denied")
		}
		if( Meteor.user().emails[0] ){
			const oldEmail = Meteor.user().emails[0].address;
			Accounts.removeEmail(this.userId, oldEmail)
		}
	 	Accounts.addEmail(this.userId, newEmail);
		Accounts.sendVerificationEmail(this.userId, newEmail)
 },
 updateProfile: function(avatar, bio, first, last){
	 check(avatar, String);
	 check(bio, String);
	 check(first, String);
	 check(last, String);

	 const userId = this.userId;

	 if(!userId){
	 	throw new Meteor.Error(403, "Access denied")
	 }

	 return Meteor.users.update({_id:userId}, {$set:{
	 	'profile.avatar': avatar,
		'profile.bio': bio,
	 	'profile.firstname': first,
		'profile.lastname': last
	 }});

 },
 updatePassword: function(newPassword){
	 check(newPassword, String);

	 const userId = this.userId;

	 if(!userId){
	 	throw new Meteor.Error(403, "Access denied")
	 }

	 return Accounts.setPassword(userId, newPassword, {logout: false})
 }
});
