/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const { faker } = require('@faker-js/faker');

const settings = new SettingsPageObject();
const signInPage = new SignInPageObject();
let user;

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.password);
      });
      settings.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();
    settings.typeUserName(newUsername);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.userNameField.should('have.value', user.username + newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.paragraph().toLowerCase();
    settings.typeBio(newBio);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.bioField.should('have.value', newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();
    settings.typeEmail(newEmail);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.visit();
    settings.emailField.should('have.value', newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.internet.password();
    settings.typePassword(newPassword);
    settings.clickSignUpBtn();

    settings.assertAlert();
    settings.clickSwalBtn();
    settings.clickLogoutBtn();
    signInPage.visit();
    settings.typeRegisterEmail(user.email);
    settings.typeRegisterPassword(newPassword);
    settings.clickSignUpBtn();
    settings.assertUserName(user.username);
  });

  it('should provide an ability to log out', () => {
    settings.clickLogoutBtn();

    settings.assertNotExistUserName();
  });
});
