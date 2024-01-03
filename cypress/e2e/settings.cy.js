/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const {
  generateUsername,
  generateEmail,
  generatePassword
} = require('../support/generateNewUser');

describe('Settings page', () => {
  let username = generateUsername();
  let email = generateEmail();
  let password = generatePassword();

  before(() => {
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.request('POST', '/users', {
      email: `${email}`,
      username: `${username}`,
      password: `${password}`
    });
    signInPage.visit();
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(username);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    cy.url().should('include', '/#/settings');
    username = generateUsername();
    settingsPage.typeUsername(username);
    settingsPage.clickOnButton('btn-cy');
    cy.get('.swal-button').click();
    homePage.assertHeaderContainUsername(username);
    cy.request('/user').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it.skip('should provide an ability to update bio', () => {

  });

  it('should provide an ability to update an email', () => {
    cy.url().should('include', '/#/settings');
    email = generateEmail();
    settingsPage.typeEmail(email); // Add bug report
    settingsPage.clickOnButton('btn-cy');
    cy.get('.swal-button').click();
    settingsPage.visit();
    cy.get('[data-cy="edit-email"]').should('not.have.text', email);
    cy.request('/user').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should provide an ability to update password', () => {
    cy.url().should('include', '/#/settings');
    password = generatePassword();
    settingsPage.typePassword(password);
    settingsPage.clickOnButton('btn-cy');
    cy.get('.swal-button').click();
    cy.request('/user').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should provide an ability to log out', () => {
    cy.url().should('include', '/#/settings');
    settingsPage.clickOnButton('cy-logout');
    cy.get('[data-cy="logo-cy"]').should('have.text', 'Conduit'.toLowerCase());
    cy.url().should('include', '/#/');
  });
});
