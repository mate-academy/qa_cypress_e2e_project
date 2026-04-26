/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.internet.userName();

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateBtn();

    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.person.bio();

    settingsPage.typeBio(newBio);
    settingsPage.clickUpdateBtn();

    settingsPage.visit();
    cy.get('textarea[placeholder="Short bio about you"]')
      .should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    cy.intercept('POST', '/user').as('updateUser');

    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateBtn();

    cy.wait('@updateUser').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateBtn();

    cy.contains('Settings').should('be.visible');
  });

  it('should provide an ability to log out', () => {
    cy.contains('Or click here to logout.').click();

    cy.contains('Sign in').should('be.visible');
    cy.contains('Sign up').should('be.visible');
    cy.location('hash').should('eq', '#/');
  });
});
