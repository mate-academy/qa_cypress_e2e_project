/// <reference types='cypress' />
/// <reference types='../support' />

const { faker } = require('@faker-js/faker');
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  let updatedData;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUpdatedSettings').then((generateUpdatedSettings) => {
      updatedData = generateUpdatedSettings;
    });
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.clearAndTypeUsername(updatedData.newUsername);
    cy.intercept('/user').as('updatedUser');
    settingsPage.clickUpdateButton();
    cy.wait('@updatedUser').its('response.statusCode').should('eq', 200);
    settingsPage.assertProfileLink(updatedData.newUsername);
    settingsPage.assertSwalTitle('Update successful!');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearAndTypeBio(updatedData.newBio);
    cy.intercept('/user').as('updatedUser');
    settingsPage.clickUpdateButton();
    cy.wait('@updatedUser').its('response.statusCode').should('eq', 200);
    settingsPage.assertSwalTitle('Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.clearAndTypeEmail(updatedData.newEmail);
    cy.intercept('/user').as('updatedUser');
    settingsPage.clickUpdateButton();
    cy.wait('@updatedUser').its('response.statusCode').should('eq', 200);
    settingsPage.assertSwalTitle('Update successful!');
    cy.clearCookies();
    settingsPage.assertTokenIsRemoved();
    cy.reload();
    signInPage.visit();
    signInPage.typeEmail(updatedData.newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.clearAndTypePassword(updatedData.newPassword);
    cy.intercept('/user').as('updatedUser');
    settingsPage.clickUpdateButton();
    cy.wait('@updatedUser').its('response.statusCode').should('eq', 200);
    settingsPage.assertSwalTitle('Update successful!');
    cy.clearCookies();
    settingsPage.assertTokenIsRemoved();
    cy.reload();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updatedData.newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutButton();
    settingsPage.assertStartUrl();
  });
});
