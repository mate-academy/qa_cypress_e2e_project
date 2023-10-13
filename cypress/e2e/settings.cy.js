/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPage from '../support/pages/settings.pageObject';
import faker from 'faker';

 const settingsPage = new SettingsPage();
 const homePage = new HomePageObject();
 const signInPage = new SignInPageObject();

 const testData = {
  email: faker.internet.email(),
  username: faker.name.firstName().toLowerCase(),
  password: `${faker.random.alpha({ count: 1 }).toUpperCase()}${faker.random.alphaNumeric(9)}`,
  bio: faker.random.words(10)
};

const invalidShortPassword = `${faker.random.alpha({ count: 1 }).toUpperCase()}${faker.random.alphaNumeric(3)}`;
const invalidLongPassword = `${faker.random.alpha({ count: 1 }).toUpperCase()}${faker.random.alphaNumeric(51)}`;

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.register(user.email, user.username, user.password).then(() => {
      cy.login(user.email, user.username, user.password);
      });
    });
      settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearUsernameField();
    settingsPage.fillUsernameField(testData.username);
    settingsPage.clickOnUpdateSettingsBtn();

    homePage.assertHeaderContainUsername(testData.username)
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillUserBioField(testData.bio);
    settingsPage.clickOnUpdateSettingsBtn();
    
    settingsPage.assertUpdatiedBio();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearEmailField();
    settingsPage.fillEmailField(testData.email);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.clickOnSettingsLink();
    settingsPage.assertUpdatiedEmail();
    settingsPage.clickOnOkBtn();
    settingsPage.clickOnLogOutBtn();
    homePage.clickOnSignInLink();
    signInPage.typeEmail(testData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);    
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillNewPasswordField(testData.password);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertUpdatiedPassword();
    settingsPage.clickOnOkBtn();
    settingsPage.clickOnLogOutBtn();
    homePage.clickOnSignInLink();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogOutBtn();

    homePage.assertcheckLogOut();
  });

  it('should not provide an ability to update password with 4 symbols', () => {
    settingsPage.fillNewPasswordField(invalidShortPassword);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.assertUpdatiedShortPassword();
  });  

  it('should not provide an ability to update password with 51 symbols', () => {
    settingsPage.fillNewPasswordField(invalidLongPassword);
    settingsPage.clickOnUpdateSettingsBtn();
    
    settingsPage.assertUpdatiedLongPassword();
  });  
});
