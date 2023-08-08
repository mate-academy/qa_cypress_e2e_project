/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let secondUser;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateSecondUser').then((generateSecondUser) => {
      secondUser = generateSecondUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUpdateUsername(secondUser.username);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.successfulUpdateSettingsMessage();
    homePage.assertHeaderContainUsername(secondUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUpdateBio(secondUser.bio);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.successfulUpdateSettingsMessage();
    homePage.usernameLink.click();
    cy.get('p').should('contain', secondUser.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUpdateEmail(secondUser.email);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.successfulUpdateSettingsMessage();

    settingsPage.clickLoguotBtn();
    signInPage.visit();
    signInPage.typeEmail(secondUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUpdatePassword(secondUser.password);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.successfulUpdateSettingsMessage();

    settingsPage.clickLoguotBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(secondUser.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLoguotBtn();

    settingsPage.assertLogOut();
  });
});
