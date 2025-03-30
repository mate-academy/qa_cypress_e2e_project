/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPage from '../support/pages/settings.pageObject';
const faker = require('faker');

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPage();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  const testData = {
    newUserName: faker.name.firstName().toLowerCase(),
    newBio: faker.lorem.words(),
    newEmail: faker.internet.email().toLowerCase(),
    newPassword: 'Qwert12345!'
  };

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(testData.newUserName);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccess('Update successful!');
    settingsPage.clickOnTheModalOkBtn();
    homePage.assertHeaderContainUsername(testData.newUserName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(testData.newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccess('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(testData.newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccess('Update successful!');
    settingsPage.clickOnTheModalOkBtn();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(testData.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(testData.newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccess('Update successful!');
    settingsPage.clickOnTheModalOkBtn();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.assertHeaderNotContainUsername();
  });
});
