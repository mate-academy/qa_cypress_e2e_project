/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

import faker from 'faker';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const newUsername = faker.name.firstName().toLowerCase();
  const newUserBio = faker.random.words().toLowerCase();
  const newUserEmail = faker.internet.email().toLowerCase();
  const newUserPassword = faker.internet.password();

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
    homePage.assertHeaderContainUsername(user.username);

    settingsPage.typeNewUserName(newUsername);

    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertModalUpdate();
    settingsPage.assertModalUpdateSucces();

    settingsPage.clickConfirmUpdateButton();

    settingsPage.clickLogOutButton();

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(newUsername);

    settingsPage.visit();

    settingsPage.assertUserNameField(newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeNewBio(newUserBio);

    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertModalUpdate();
    settingsPage.assertModalUpdateSucces();

    settingsPage.clickConfirmUpdateButton();

    settingsPage.clickLogOutButton();

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    settingsPage.visit();

    settingsPage.assertUserBio(newUserBio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeNewEmail(newUserEmail);

    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertModalUpdate();
    settingsPage.assertModalUpdateSucces();

    settingsPage.clickConfirmUpdateButton();

    settingsPage.clickLogOutButton();

    signInPage.visit();

    signInPage.typeEmail(newUserEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);

    settingsPage.visit();

    settingsPage.assertEmailField(newUserEmail);

    // This is a bug. The email is not changed
  });

  it('should provide an ability to update password', () => {
    settingsPage.typeNewPassword(newUserPassword);

    settingsPage.clickUpdateSettingsButton();

    settingsPage.assertModalUpdate();
    settingsPage.assertModalUpdateSucces();

    settingsPage.clickConfirmUpdateButton();

    settingsPage.clickLogOutButton();

    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(newUserPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutButton();

    homePage.assertsignInLinkOnTheHome();
  });
});
