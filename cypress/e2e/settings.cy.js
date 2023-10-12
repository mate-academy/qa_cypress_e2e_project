/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

let user;
let newUser;

const bio = faker.lorem.words();
const newPassword = faker.internet.password();

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
    cy.task('generateUser').then((generatedUser) => {
      newUser = generatedUser;
    });
    settingsPage.settingsPageClick();
  });

  it('should provide an ability to update username', () => {
    settingsPage.fillUsernameField(newUser.username);
    settingsPage.clickUpdateBtn();
    homePage.assertHeaderContainUsername(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.fillBioField(bio);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccesModal();
    homePage.clickOnUsername();
    settingsPage.checkBio(bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.fillEmailField(newUser.email);
    settingsPage.clickUpdateBtn();
    settingsPage.checkEmail(newUser.email);
    settingsPage.checkSuccesModal();
    signInPage.visit();
    signInPage.typeEmail(newUser.email);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
    settingsPage.checkSuccesModal();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.passwordField.type(newPassword);
    signInPage.signInBtn.click();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
    homePage.checkLogOut(user.username);
  });
});
