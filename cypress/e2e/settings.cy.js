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
  let testUser;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateTestUser').then((generateTestUser) => {
      testUser = generateTestUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewUsername(testUser.username);
    settingsPage.clickUpdateBtn();
    settingsPage.popWindow();
    homePage.assertHeaderContainUsername(testUser.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewBio(testUser.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.popWindow();
    homePage.usernameLink.click();
    settingsPage.asserBio(testUser.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(testUser.email);
    settingsPage.clickUpdateBtn();
    settingsPage.popWindow();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(testUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(testUser.password);
    settingsPage.clickUpdateBtn();
    settingsPage.popWindow();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testUser.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    homePage.signInLink();
    homePage.signUpLink();
  });
});
