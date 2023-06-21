/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import UserPagePageObject from '../support/pages/userPage.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const userPage = new UserPagePageObject();

describe('Settings page', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should provide an ability to update username', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.usernameField
      .type('{selectall}' + user.username);

    settingsPage.updateSettingsBtn
      .click();

    settingsPage.updateSuccessfulMessage
      .should('contain', 'Update successful!');

    settingsPage.dialogOkBtn
      .click();

    userPage.visitUserPage(user.username);

    userPage.userName
      .should('contain', user.username);
  });

  it('should provide an ability to update bio', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.bioField
      .type('{selectall}' + article.body);

    settingsPage.updateSettingsBtn
      .click();

    settingsPage.updateSuccessfulMessage
      .should('contain', 'Update successful!');

    settingsPage.dialogOkBtn
      .click();

    userPage.visitUserPage('riot');

    userPage.userBio
      .should('contain', article.body);
  });

  it('should provide an ability to update an email', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.emailField
      .type('{selectall}' + user.email);

    settingsPage.updateSettingsBtn
      .click();

    settingsPage.updateSuccessfulMessage
      .should('contain', 'Update successful!');

    settingsPage.dialogOkBtn
      .click();

    settingsPage.logoutBtn
      .click();

    cy.loginWithoutRegistration(user.email);

    cy.reload();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.passwordField
      .type('{selectall}' + user.password);

    settingsPage.updateSettingsBtn
      .click();

    settingsPage.updateSuccessfulMessage
      .should('contain', 'Update successful!');

    settingsPage.dialogOkBtn
      .click();

    settingsPage.logoutBtn
      .click();

    cy.loginWithoutRegistration('riot@qa.team', user.password);

    cy.reload();

    homePage.usernameLink
      .should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login();
    settingsPage.visit();

    settingsPage.logoutBtn
      .click();

    homePage.signUpLink
      .should('exist');

    homePage.signInLink
      .should('exist');
  });
});
