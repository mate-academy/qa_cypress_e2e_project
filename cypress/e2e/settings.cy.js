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
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
  });

  it('should provide the ability to update username', () => {
    settingsPage.typeUsername(user.otherUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMsg();
    settingsPage.assertUpdatedUsername(user.otherUsername);
  });

  it('should provide the ability to update bio', () => {
    settingsPage.typeBio(user.otherBio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMsg();
    cy.visit(`/#/@${user.username}/`);
    settingsPage.assertUpdatedBio(user.otherBio);
  });

  it('should provide the ability to update an email', () => {
    settingsPage.typeEmail(user.otherEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMsg();
  });

  it('should provide the ability to update password', () => {
    settingsPage.typePassword(user.otherPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdateMsg();
  });

  it('should provide the ability to log out', () => {
    settingsPage.clickLogoutBtn();
    cy.url().should('eq', 'http://localhost:1667/#/');
  });
});
