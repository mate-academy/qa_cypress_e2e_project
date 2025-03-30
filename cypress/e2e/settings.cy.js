/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clearUserInfo('Your username');
    settingsPage.typeUsername('new' + user.username);
    settingsPage.clickUpdSetBtn();

    settingsPage.assertSuccessfulUpdate();
    homePage.assertHeaderContainUsername('new' + user.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeBio(user.bio);
    settingsPage.clickUpdSetBtn();

    settingsPage.assertSuccessfulUpdate();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clearUserInfo('Email');
    settingsPage.typeEmail('new' + user.email);
    settingsPage.clickUpdSetBtn();

    settingsPage.assertSuccessfulUpdate();

    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clearUserInfo('Password');
    settingsPage.typePassword(user.password);
    settingsPage.clickUpdSetBtn();

    settingsPage.assertSuccessfulUpdate();

    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    settingsPage.assertLogOut();
  });
});
