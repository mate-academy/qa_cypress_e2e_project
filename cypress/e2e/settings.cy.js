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
  let user2;
  before(() => {
    cy.task('generateUser').then((generateUser1) => {
      user = generateUser1;
    });

    cy.task('generateUser').then((generateUser2) => {
      user2 = generateUser2;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user2.username);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfullUpdate();
    homePage.assertHeaderContainUsername(user2.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfullUpdate();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user2.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfullUpdate();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user2.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user2.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessfullUpdate();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user2.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
