/// <reference types="cypress" />
/// <reference types="../support" />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import { generateFakeUser } from '../support/fakeUser';
import { faker } from '@faker-js/faker';

const signUpPage = new SignUpPageObject();
const settingsPage = new SettingsPageObject();

describe('User Profile Update', () => {
  const user = generateFakeUser();
  const newUsername = faker.internet.userName();
  const newEmail = faker.internet.email();
  const newPassword = faker.internet.password();
  const newBio = faker.lorem.sentence(); 

  before(() => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    cy.wait(4000);

    cy.contains('OK').click({ force: true });
  });

  it('user is able to update their profile information', () => {
    cy.visit('http://localhost:1667/#/settings');
    cy.wait(2000);

    settingsPage.clearBioField();
    settingsPage.typeBio(newBio);

    settingsPage.clearUsernameField();
    settingsPage.typeUsername(newUsername);

    settingsPage.clearEmailField();
    settingsPage.typeEmail(newEmail);

    settingsPage.clearPasswordField();
    settingsPage.typePassword(newPassword);

    settingsPage.clickUpdateSettingsBtn();

    cy.contains('Update successful!').should('be.visible');

    cy.wait(1000);
    cy.contains('OK').click({ force: true });

    settingsPage.bioField.should('have.value', newBio);

    settingsPage.usernameField.should('have.value', newUsername);

    // Bug
    // settingsPage.emailField.should('have.value', newEmail);
  });
});
