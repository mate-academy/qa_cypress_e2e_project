/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateUsername(user.newUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulUpdateMessage();
    homePage.assertHeaderContainUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateBio(user.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulUpdateMessage();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateEmail(user.newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulUpdateMessage();
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updatePassword(user.newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.successfulUpdateMessage();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOutBtn();
    cy.get(':nth-child(2) > .nav-link')
      .should('contain', 'Sign in');
    cy.get(':nth-child(3) > .nav-link')
      .should('contain', 'Sign up');
  });
});
