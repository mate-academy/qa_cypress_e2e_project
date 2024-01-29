/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const userName = faker.name.firstName().toLowerCase();
  const newUser = {
    newUserName: userName,
    bio: faker.lorem.words(15).toLowerCase(),
    newEmail: `${userName}@gmail.com`,
    newPassword: faker.internet.password()
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeNewUserName(newUser.newUserName);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalWindow();
    settingsPage.clickOkBtn();
    homePage.assertHeaderContainNewUsername(newUser.newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeNewBio(newUser.bio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalWindow();
    settingsPage.clickOkBtn();
    settingsPage.checkNewBio(newUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeNewEmail(newUser.newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalWindow();
    settingsPage.clickOkBtn();
    settingsPage.clickLoggedOutBtn();
    signInPage.visit();
    signInPage.typeEmail(newUser.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeNewPassword(newUser.newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.assertModalWindow();
    settingsPage.clickOkBtn();
    settingsPage.clickLoggedOutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newUser.newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLoggedOutBtn();
    homePage.assertHederContainSignIn();
    homePage.assertHederContainSignUp();
  });
});
