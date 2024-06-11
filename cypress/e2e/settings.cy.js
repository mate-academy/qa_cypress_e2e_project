/// <reference types='cypress' />
/// <reference types='../support' />

import PageObject from '../support/PageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const pageObject = new PageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

let user;
const email = 'donkey12@gmail.vom';
const assertPopupContainTitle = 'Update successful!';

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('/#/');
    // cy.wait(5000);
  });

  it('should provide an ability to update username', () => {
    cy.register(email, user.username, user.password);
    cy.signIn(email, user.password);
    settingsPage.visit();
    settingsPage.updateUsername(user.usernameNew);
    settingsPage.submit();
    pageObject.assertPopupContainTitle(assertPopupContainTitle);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    settingsPage.visit();
    settingsPage.updateBio(user.bioNew);
    settingsPage.submit();
    pageObject.assertPopupContainTitle(assertPopupContainTitle);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    settingsPage.visit();
    settingsPage.updateEmail(user.emailNew);
    settingsPage.submit();
    pageObject.assertPopupContainTitle(assertPopupContainTitle);
    cy.reload();
    settingsPage.assertEmail(user.emailNew);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    settingsPage.visit();
    settingsPage.updatePassword(user.passwordNew);
    settingsPage.submit();
    cy.wait(2000);
    cy.reload();
    // settingsPage.visit();
    settingsPage.logout();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.passwordNew);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    cy.signIn(user.email, user.password);
    settingsPage.visit();
    settingsPage.logout();
    homePage.visit('/#/');
  });
});
