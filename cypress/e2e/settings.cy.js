/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clearUserInfo('Your username');
    settingsPage.typeUsername('new' + user.username);
    settingsPage.UpdateSettingsButton();
    settingsPage.successAlert();
    homePage.assertHeaderContainUsername('new' + user.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.UpdateSettingsButton();
    settingsPage.successAlert();
    settingsPage.checkBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clearUserInfo('Email');
    settingsPage.typeEmail('new' + user.email);
    settingsPage.UpdateSettingsButton();
    settingsPage.successAlert();
    settingsPage.checkEmail('new' + user.email);
    settingsPage.signInWithNewEmail(
      'new' + user.email,
      user.password
    );
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clearUserInfo('Password');
    settingsPage.typePassword('Test123!');
    settingsPage.UpdateSettingsButton();
    settingsPage.successAlert();
    settingsPage.signInWithNewEmail(
      user.email,
      'Test123!'
    );
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.logOutButton();
    settingsPage.assertLogOut();
  });
});
