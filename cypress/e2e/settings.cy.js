/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.updateUsername(user.username);
    settingsPage.assertUsernameUpdated(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.assertBioUpdated(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(user.email);
    settingsPage.assertEmailUpdated(user.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(user.password);
    settingsPage.assertPasswordUpdated(user.password);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    settingsPage.assertLoggedOut();
  });
});
