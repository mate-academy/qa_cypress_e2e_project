/// <reference types='cypress' />
/// <reference types='../support' />
import SettingsPageObject
  from '../support/pages/settings.pageObject';
import HomePageObject 
  from '../support/pages/home.pageObject';
import SignInPageObject 
  from '../support/pages/signIn.pageObject';

  const settingsPage = new SettingsPageObject();
  const homePage = new HomePageObject();
  const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let updatedBio;

  beforeEach(() => {
  cy.task('db:clear');

  cy.task('generateUser')
    .then((generateUser) => {
      user = generateUser;
    });

  cy.task('generateData')
    .then((generateData) => {
      updatedBio = generateData;
    });
  cy.login();
  settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.changeUserName(updatedBio.newUserName);
    settingsPage.clickUpdateBtn();
    homePage.successfulUpdate();
  });

  it('should provide an ability to update bio', () => {
    settingsPage.changeBio(updatedBio.bio);
    settingsPage.clickUpdateBtn();
    homePage.successfulUpdate();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.changeEmail(updatedBio.newEmail);
    settingsPage.clickUpdateBtn();
    homePage.successfulUpdate();
  });

  it('should provide an ability to update password', () => {
    settingsPage.changePassword(updatedBio.newPassword);
    settingsPage.clickUpdateBtn();
    homePage.successfulUpdate();
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    homePage.checkLogOut();
  });

  it('should not provide an ability to update email to invalid email', () => {
    settingsPage.changeEmail(user.invalidEmail);
    settingsPage.clickUpdateBtn();
    homePage.alertInvalidEmail();
  });

  it('should not provide an ability to update password with less than 8 characters', () => {
    settingsPage.changePassword(user.shortPassword);
    settingsPage.clickUpdateBtn();
    homePage.alertShortCred();
  });
});
