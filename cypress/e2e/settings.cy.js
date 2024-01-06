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
  generatePassword,
  generateBio
} = require('../support/generateNewUser');

describe('Settings page', () => {
  let username = generateUsername();
  let generateNewEmail = generateEmail();
  let password = generatePassword();
  let bio = generateBio();

  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
    cy.request('POST', '/users', {
      email: `${generateNewEmail}`,
      username: `${username}`,
      password: `${password}`
    });
    signInPage.typeEmail(generateNewEmail);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(username);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    cy.url().should('include', '/#/settings');
    username = generateUsername();
    settingsPage.typeUsername(username);
    settingsPage.clickOnButton('update-btn');
    cy.get('.swal-button').click();
    homePage.assertHeaderContainUsername(username);
    cy.request('/user').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should provide an ability to update bio', () => {
    cy.url().should('include', '/#/settings');
    bio = generateBio();
    cy.getByDataCy('username-link').should('contain', username);
    settingsPage.bioTextarea.should('exist');
    settingsPage.updateSettingsBtn.should('exist');
    settingsPage.typeBio(bio);
    settingsPage.clickUpdateBtn('update-btn');
    cy.get('.swal-modal').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  });

  it('should provide an ability to update an email', () => {
    cy.url().should('include', '/#/settings');
    generateNewEmail = generateEmail();
    settingsPage.typeEmail(generateNewEmail);
    settingsPage.clickOnButton('update-btn');
    cy.get('.swal-button').click();
    settingsPage.visit();
    cy.get('[data-cy="edit-email"]').should('not.have.text', generateNewEmail);
    cy.request('/user').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('should provide an ability to update password', () => {
    cy.url().should('include', '/#/settings');
    password = generatePassword();
    settingsPage.typePassword(password);
    settingsPage.clickOnButton('update-btn');
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
