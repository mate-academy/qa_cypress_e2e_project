/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import userGenerator from '../plugins/userGenerator';
import faker from 'faker';
import {
  updateSuccessMessage,
  confirmationMessage
} from '../plugins/alertMessages';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let editedPassword;

  before(() => {
    cy.task('db:clear');
    user = userGenerator.generateUser();
    cy.registerUser({
      email: user.email,
      username: user.username,
      password: user.password
    });
  });

  beforeEach(() => {
    signInPage.visit();
  });

  afterEach(() => {
    settingsPage.logOutSettings();
  });

  it('should provide an ability to update username', () => {
    signInPage.validateEmailAndPassword(user.email, user.password);
    signInPage.performLogin(user.email, user.password);
    homePage.clickSettings();

    const editedUsername = faker.lorem.words(1);
    settingsPage.usernameInput.clear().type(editedUsername);
    settingsPage.submitSettings();

    cy.contains(updateSuccessMessage).should('be.visible');
    cy.contains(confirmationMessage).should('be.visible').click();

    homePage.assertHeaderContainUsername(editedUsername);
    cy.get('input[placeholder="Your username"]')
      .should('have.value', editedUsername);
  });

  it('should provide an ability to update bio', () => {
    signInPage.validateEmailAndPassword(user.email, user.password);
    signInPage.performLogin(user.email, user.password);
    homePage.clickSettings();

    const editedBio = faker.lorem.words(4);
    settingsPage.bioInput.clear().type(editedBio);
    settingsPage.submitSettings();

    cy.contains(updateSuccessMessage).should('be.visible');
    cy.contains(confirmationMessage).should('be.visible').click();

    cy.get('textarea[placeholder="Short bio about you"]')
      .should('have.value', editedBio);
  });

  it('should provide an ability to update an email', () => {
    signInPage.validateEmailAndPassword(user.email, user.password);
    signInPage.performLogin(user.email, user.password);
    homePage.clickSettings();

    const editedEmail = faker.internet.email().toLowerCase();
    settingsPage.emailInput.clear().type(editedEmail);
    settingsPage.submitSettings();

    cy.contains(updateSuccessMessage).should('be.visible');
    cy.contains(confirmationMessage).should('be.visible').click();

    cy.get('input[placeholder="Email"]').should('have.value', editedEmail);
  });

  it('should provide an ability to update password', () => {
    signInPage.validateEmailAndPassword(user.email, user.password);
    signInPage.performLogin(user.email, user.password);
    homePage.clickSettings();

    editedPassword = faker.internet.password();
    settingsPage.passwordInput.type(editedPassword);
    settingsPage.submitSettings();

    cy.contains(updateSuccessMessage).should('be.visible');
    cy.contains(confirmationMessage).should('be.visible').click();
  });

  it('should allow logging in with the updated password', () => {
    signInPage.validateEmailAndPassword(user.email, editedPassword);
    signInPage.performLogin(user.email, editedPassword);
    homePage.assertHeaderContainUsername(user.username);
    homePage.clickSettings();
  });
});
