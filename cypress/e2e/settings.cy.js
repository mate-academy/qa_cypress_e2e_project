/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.register();
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.editUsername(user.username);
    settingsPage.submitEdit();
    settingsPage.verifyProfilePage(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.editBio(user.bio);
    settingsPage.submitEdit();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.editEmail(user.email);
    settingsPage.submitEdit();
  });

  it('should provide an ability to update password', () => {
    settingsPage.editPassword(user.password);
    settingsPage.submitEdit();
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutUser();
    settingsPage.verifyLogout();
  });
});
