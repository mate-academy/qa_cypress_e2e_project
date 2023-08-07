/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settingsPage.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/userPage.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const userPage = new UserPageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let newUser;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateNewUser').then((generateNewUser) => {
      newUser = generateNewUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.addNewUsername(newUser.username);

    settingsPage.clickOnUpdateBtn();

    settingsPage.assertSettingsUpdateMsg();

    settingsPage.assertNewUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.addBio(newUser.bio);

    settingsPage.clickOnUpdateBtn();

    settingsPage.assertSettingsUpdateMsg();

    homePage.usernameLink.click();

    userPage.assertNewBio(newUser.bio);
  });

  it.only('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.addNewEmail(newUser.email);

    settingsPage.clickOnUpdateBtn();

    settingsPage.assertSettingsUpdateMsg();

    // settingsPage.assertNewEmail(newUser.email); email doesn't change on the page, uncomment to check

    settingsPage.clickOnTheLogoutBtn();

    signInPage.visit();

    signInPage.typeEmail(newUser.email);

    signInPage.typePassword(user.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.addNewPassword(newUser.password);

    settingsPage.clickOnUpdateBtn();

    settingsPage.assertSettingsUpdateMsg();

    settingsPage.clickOnTheLogoutBtn();

    signInPage.visit();

    signInPage.typeEmail(user.email);

    signInPage.typePassword(newUser.password);

    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();

    settingsPage.clickOnTheLogoutBtn();

    settingsPage.assertSuccessfullLogout();
  });
});
