import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import AppLayout from '/imports/startup/client/AppLayout'
import '../imports/startup/account-config.js';

Meteor.startup(() => {
  render(<AppLayout />, document.getElementById('react-target'));
});
