/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.login().then(() => {
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserName(user.username);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.getSuccessfulNotification();
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.username + user.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.getSuccessfulNotification();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.getSuccessfulNotification();
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.getSuccessfulNotification();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutSettingsBtn();

    cy.get('.logo-font').should('contain', 'conduit');
  });
});
