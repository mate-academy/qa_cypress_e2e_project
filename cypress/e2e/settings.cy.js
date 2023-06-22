/// <reference types="cypress" />
/// <reference types="../support" />

import homePageObject from '../support/pages/home.pageObject';
import settingsPageObject from '../support/pages/settings.pageObjects';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const settingsPage = new settingsPageObject();
const homePage = new homePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  const testData = {

    newUsername: faker.name.firstName(),
    newBio: faker.address.country(),
    newPassword: 'Qw12345678!',
    newEmail: faker.internet.email().toLowerCase()
  };
  before(() => {

    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });

  });

  beforeEach(() => {
    cy.task('db:clear');

  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.usernameField
      .clear()
      .type(testData.newUsername);
    settingsPage.updateBtn;
    homePage.usernameLink
      .should('contain', testData.newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.visit;
    settingsPage.bioField
      .type(testData.newBio);
    settingsPage.updateBtn;
    settingsPage.visit;
    settingsPage.bioField
      .should('have.value', testData.newBio);

  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.emailField
      .clear()
      .type(testData.newEmail);
    settingsPage.updateBtn;
    settingsPage.visit;
    settingsPage.emailField
      .should('have.value', testData.newEmail);

  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.PasswordField
      .type(testData.newPassword);
    settingsPage.updateBtn;

    cy.wait(1000);
    cy.clearCookies();
    cy.reload();

    signInPage.visit();
    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(testData.newPassword);
    signInPage.signInBtn
      .click();
    homePage.usernameLink
      .should('contain', user.username);

  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.logoutBtn;
    cy.getByDataCy('header')
      .should('contain', 'Sign up');

  });
});