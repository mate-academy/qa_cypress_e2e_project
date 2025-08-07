/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { faker } from '@faker-js/faker';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      signInPage.visit();
      cy.register(user.email, user.username, user.password);

      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
    });
  });

  const openSettings = () => {
    homePage.usernameLink.click();
    homePage.editProfileSettingsLink.click();
  };

  it('should update username', () => {
    openSettings();

    const newUsername = user.username + faker.string.alpha(3);

    cy.intercept('PUT', '**/api/user').as('updateUser');

    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateSettingsBtn();

    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);

    homePage.visit();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should update bio and persist it', () => {
    openSettings();

    const randomBio = faker.lorem.sentence();

    cy.intercept('PUT', '**/api/user').as('updateUser');

    settingsPage.typeBio(randomBio);
    settingsPage.clickUpdateSettingsBtn();

    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);

    cy.visit('/#/settings');
    settingsPage.bioTextarea.should('have.value', randomBio);
  });

  it('should update email and persist it', () => {
    openSettings();

    const newEmail = faker.internet.email();

    cy.intercept('PUT', '**/api/user').as('updateUser');

    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateSettingsBtn();

    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);

    cy.visit('/#/settings');
    settingsPage.emailInput.should('have.value', newEmail);
  });

  it('should update password and allow login with it', () => {
    openSettings();

    const newPassword = faker.internet.password({ length: 12 });

    cy.intercept('PUT', '**/api/user').as('updateUser');

    settingsPage.typePassword(newPassword);
    settingsPage.clickUpdateSettingsBtn();

    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);

    settingsPage.clickLogoutBtn();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should log out from settings', () => {
    openSettings();

    settingsPage.clickLogoutBtn();
    homePage.usernameLink.should('not.exist');
  });
});
