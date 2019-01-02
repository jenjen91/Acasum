import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = 'AcaSum';
Accounts.emailTemplates.from = 'AcaSum Admin <contact@acasum.com>';
Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to Acasum, ${user.username}`;
};
Accounts.emailTemplates.enrollAccount.text = (user, url) => {
	const urlWithoutHash = url.replace( '#/', '' );

  return ' To activate your account, simply click the link below:\n\n'
    + urlWithoutHash;
};
Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'AcaSum Password Reset <no-reply@acasum.com>';
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   text(user, url) {
		 const urlWithoutHash = url.replace( '#/', '' );

      return `Hey ${user.username}! Verify your e-mail by following this link: ${urlWithoutHash}`;
   }
};
