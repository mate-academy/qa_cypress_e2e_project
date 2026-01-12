/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import generateUser from '../support/utils/generateUser';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to update username', () => {
    const { username, email, password } = generateUser();
    signInPage.visit();
    cy.register(email, username, password);
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.clickHomeLink();
    homePage.clickSettingsLink();
    settingsPage.typeUserName('NewUser123!');
    settingsPage.clickUpdateSettingsBtn();
    homePage.assertHeaderContainUsername('NewUser123!');
  });

  it('should provide an ability to update bio', () => {
    const { username, email, password } = generateUser();
    signInPage.visit();
    cy.register(email, username, password);
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.clickHomeLink();
    homePage.clickSettingsLink();
    settingsPage.typeBio('New Bio Text!!!');
    settingsPage.clickUpdateSettingsBtn();
    homePage.clickSettingsLink();
    settingsPage.clickSwalBtn();
    settingsPage.assertUpdatedBio('New Bio Text!!!');
  });

  it('should provide an ability to update an email', () => {
    const { username, email, password } = generateUser();
    signInPage.visit();
    cy.register(email, username, password);
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.clickHomeLink();
    homePage.clickSettingsLink();
    settingsPage.typeEmail('updateMail@example.com');
    settingsPage.clickUpdateSettingsBtn();
    homePage.clickSettingsLink();
    settingsPage.clickSwalBtn();
    settingsPage.clickLogoutBtn();
    homePage.clickSignInNav();
    signInPage.typeEmail('updateMail@example.com');
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(username);
  });

  it('should provide an ability to update password', () => {
    const { username, email, password } = generateUser();
    signInPage.visit();
    cy.register(email, username, password);
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.clickHomeLink();
    homePage.clickSettingsLink();
    settingsPage.typePassword('UpdatePassword1');
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.clickSwalBtn();
    settingsPage.clickLogoutBtn();
    homePage.clickSignInNav();
    signInPage.typeEmail(email);
    signInPage.typePassword('UpdatePassword1');
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(username);
  });

  it('should provide an ability to log out', () => {
    const { username, email, password } = generateUser();
    signInPage.visit();
    cy.register(email, username, password);
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.clickHomeLink();
    homePage.clickSettingsLink();
    settingsPage.clickLogoutBtn();
    homePage.assertLoggingOut();
  });
});
