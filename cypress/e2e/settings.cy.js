/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

const newUsername = 'lionking28';
const newPassword = 'Simba2000)';
const newEmail = 'lionking28@mailinator.com';
const newBio = 'Good lion';

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);

    settingsPage.settingsLinkClick();

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.modalOkClick();
    settingsPage.userNameFieldCheck(newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);

    settingsPage.settingsLinkClick();

    settingsPage.updateBio(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.bioFieldCheck(newBio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);

    settingsPage.settingsLinkClick();

    settingsPage.updateEmail(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.modalOkClick();
    settingsPage.emailFieldCheck(newEmail);
    settingsPage.clickLogoutBtn();
    cy.reload().clearCookies();
    cy.signIn(newEmail, user.password);
    settingsPage.profileLinkCheck(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);

    settingsPage.settingsLinkClick();

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.clickLogoutBtn();
    cy.reload().clearCookies();
    cy.signIn(user.email, newPassword);
    homePage.visit();
    settingsPage.profileLinkCheck(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);

    settingsPage.settingsLinkClick();

    settingsPage.clickLogoutBtn();
    homePage.checkSignInLink();
  });
});
