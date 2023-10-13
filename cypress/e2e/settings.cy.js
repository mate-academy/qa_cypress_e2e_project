/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

let element;
let user;
let newInfo;
let text;

describe('Settings page', () => {
  before(() => {
    cy.allure()
      .feature('Update user info')
      .epic('Logged in user');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('customVariables').then((customVariables) => {
      element = customVariables;
    });
    cy.task('generateUser').then((generateUser) => {
      newInfo = generateUser;
    });
    cy.task('websiteText').then((websiteText) => {
      text = websiteText;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.loginUser(user);
    settingsPage.openPage(element.url.settings);
  });
  it('should provide an ability to update user image', () => {
    settingsPage.clearData(element.field.userImageUrl);
    settingsPage.fillIn(element.field.userImageUrl, newInfo.userImage);
    settingsPage.clickOnButton(element.button.update);
    settingsPage.assertPopupStatus(element.icon.success);
    settingsPage.closePopUp(element.popup.button);
    settingsPage.clickOnLink(element.link.headerUsername);

    userPage.assertUrl(element.url.user);
    userPage.assertUserImage(element.field.userImage, newInfo.userImage);
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearData(element.field.username);
    settingsPage.fillIn(element.field.username, newInfo.username);
    settingsPage.clickOnButton(element.button.update);
    settingsPage.assertPopupStatus(element.icon.success);
    settingsPage.closePopUp(element.popup.button);
    settingsPage.assertData(element.link.headerUsername, newInfo.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearData(element.field.bio);
    settingsPage.fillIn(element.field.bio, newInfo.bio);
    settingsPage.clickOnButton(element.button.update);
    settingsPage.assertPopupStatus(element.icon.success);
    settingsPage.closePopUp(element.popup.button);
    settingsPage.clickOnLink(element.link.headerUsername);

    userPage.assertData(element.field.userData, newInfo.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearData(element.field.email);
    settingsPage.fillIn(element.field.email, newInfo.email);
    settingsPage.clickOnButton(element.button.update);
    settingsPage.assertPopupStatus(element.icon.success);
    settingsPage.closePopUp(element.popup.button);
    settingsPage.clickOnButton(element.button.logout);

    homePage.assertUrl(element.url.homePage);
    homePage.clickOnLink(element.link.headerSignIn);

    signInPage.fillIn(element.field.email, newInfo.email);
    signInPage.fillIn(element.field.password, user.password);
    signInPage.clickOnButton(element.button.signIn);

    homePage.assertData(element.link.headerUsername, user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.clearData(element.field.password);
    settingsPage.fillIn(element.field.password, newInfo.password);
    settingsPage.clickOnButton(element.button.update);
    settingsPage.assertPopupStatus(element.icon.success);
    settingsPage.closePopUp(element.popup.button);
    settingsPage.clickOnButton(element.button.logout);

    homePage.assertUrl(element.url.homePage);
    homePage.clickOnLink(element.link.headerSignIn);

    signInPage.fillIn(element.field.email, user.email);
    signInPage.fillIn(element.field.password, newInfo.password);
    signInPage.clickOnButton(element.button.signIn);

    homePage.assertData(element.link.headerUsername, user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnButton(element.button.logout);

    homePage.assertUrl(element.url.homePage);
    homePage.assertData(element.link.headerSignUp, text.signUp);
  });
});
