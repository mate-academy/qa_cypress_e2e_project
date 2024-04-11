/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject";
import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";
import UserAccountPageObject from "../support/pages/userAccount.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const userAccountPage = new UserAccountPageObject();
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

    cy.login(user.email, user.username, user.password);
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.changeUsername(user.newUsername);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulModalMessage();
    settingsPage.closeModalMessage();
    settingsPage.openMainPage();

    homePage.assertHeaderContainUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.changeBio(user.newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulModalMessage();
    settingsPage.closeModalMessage()

    userAccountPage.visit(`/#/@${user.username}`);
    userAccountPage.assertUserBio(user.newBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.changeEmail(user.newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulModalMessage();
    settingsPage.closeModalMessage();
    // settingsPageObject.assertNewEmail(user.newEmail); bag
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();

    settingsPage.changePassword(user.newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.assertSuccessfulModalMessage();
    settingsPage.closeModalMessage();

    settingsPage.clickLogoutBtn();
    homePage.assertHeaderContainSignIn();

    signInPage.visit();
    
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    homePage.assertHeaderContainSignIn();
  });
});
