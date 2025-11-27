import SettingsPage from '../support/pages/settings.pageObject';
import SignInPage from '../support/pages/signIn.pageObject';
import HomePage from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

/// <reference types="cypress" />
/// <reference types="../support" />

const settingsPage = new SettingsPage();
const signInPage = new SignInPage();
const homePage = new HomePage();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generated) => {
      user = generated;

      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(function () {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'updated_' + user.username;

    settingsPage.updateUsername(newUsername);
    user.username = newUsername;

    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.sentence();

    settingsPage.updateBio(newBio);

    cy.visit(`/profile/${user.username}`);
    cy.contains(newBio).should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'updated_' + user.email;

    settingsPage.updateEmail(newEmail);
    user.email = newEmail;

    cy.contains('Your Settings');
    settingsPage.visit();
    settingsPage.emailInput().should('have.value', newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPass = faker.internet.password(12, true);

    settingsPage.updatePassword(newPass);

    cy.url().should('include', `/profile/${user.username}`);

    user.password = newPass;

    settingsPage.visit();
    settingsPage.logout();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('[data-cy=nav-sign-in]').should('exist');
  });
});
