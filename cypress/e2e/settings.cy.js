/// <reference types="cypress" />
/// <reference types="../support" />

import faker from "faker";
import HomePageObject from "../support/pages/home.pageObject";
import UserPageObject from "../support/pages/user.pageObject";
import SettingsPageObject from "../support/pages/settings.pajeObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const homePage = new HomePageObject();
const userPage = new UserPageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const testData = {
    username: faker.lorem.word(),
    bio: faker.lorem.words(),
    email: faker.lorem.word() + '@qa.team',
    password: "Password1!"
  }

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.typeNewUsername(testData.username);
    settingsPage.clickUpdateBtn();

    settingsPage.dialogWindow
      .should('contain', 'Update successful!');
    settingsPage.clickOkBtn();

    homePage.usernameLink
      .should('contain', testData.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.typeNewBio(testData.bio);
    settingsPage.clickUpdateBtn();

    settingsPage.dialogWindow
      .should('contain', 'Update successful!');
    settingsPage.clickOkBtn();

    homePage.usernameLink.click();
    userPage.assertBio(testData.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.typeNewEmail(testData.email);
    settingsPage.clickUpdateBtn();

    settingsPage.dialogWindow
      .should('contain', 'Update successful!');
    settingsPage.clickOkBtn();
    settingsPage.assertEmailChanged(testData.email);

    settingsPage.clickLogoutBtn();
    // cy.login(testData.email, user.password);
    // homePage.usernameLink.should('contain', user.username);

    homePage.signInLink.click();
    signInPage.emailField.type(testData.email);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.typeNewPassword(testData.password);
    settingsPage.clickUpdateBtn();

    settingsPage.dialogWindow
      .should('contain', 'Update successful!');
    settingsPage.clickOkBtn();

    settingsPage.clickLogoutBtn();
    // cy.login(user.email, testData.password);
    // homePage.usernameLink.should('contain', user.username);

    homePage.signInLink.click();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(testData.password);
    signInPage.signInBtn.click();
    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);

    settingsPage.visit();
    settingsPage.clickLogoutBtn();

    homePage.signInLink.should('be.visible');
    homePage.signUpLink.should('be.visible');
  });
});
