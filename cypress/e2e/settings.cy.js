/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      signInPage.visit();
      cy.register(user.email, user.username, user.password);

      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
    });
  });

  it('should provide an ability to update username', () => {
    cy.wait(1000);
    settingsPage.visit();
    settingsPage.updateUsername();
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertSuccessfulUpdate();

    homePage.visit();
    homePage.assertHeaderContainUsername(user.username + 'new');
  });

  it('should provide an ability to update bio', () => {
    cy.wait(1000);
    settingsPage.visit();
    settingsPage.updateBio();
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertSuccessfulUpdate();
  });

  // the user cannot log in with a new email
  it('should provide an ability to update an email', () => {
    cy.wait(1000);
    settingsPage.visit();
    settingsPage.updateEmail(user.email);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertSuccessfulUpdate();
    settingsPage.closeThePopUp();

    settingsPage.clickOnLogOutBtn();

    signInPage.visit();
    signInPage.typeEmail('new' + user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update password', () => {
    cy.wait(1000);
    settingsPage.visit();
    settingsPage.updatePassword(user.password);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertSuccessfulUpdate();
    settingsPage.closeThePopUp();

    settingsPage.clickOnLogOutBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password + 'new');
    signInPage.clickSignInBtn();

    homePage.visit();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.wait(1000);
    settingsPage.visit();
    settingsPage.clickOnLogOutBtn();

    homePage.visit();
    homePage.assertUserLogOut();
  });
});
