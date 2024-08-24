/// <reference types="cypress" />

import PageObject from '../PageObject';
import ProfilePageObject from './profile.pageObject';
import {
  generateInvalidEmailForTest,
  setPasswordForTest
} from '../data_generation/dataForSpecificTest';

class SettingsPageObject extends PageObject {
  constructor() {
    super();

    this.url = `#/settings`;
    this.profilePage = new ProfilePageObject();
  }

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  get updateBtn() {
    return cy.getByDataQa('btn-update-settings');
  }

  get logoutBtn() {
    return cy.getByDataQa('btn-logout-settings');
  }

  assertSettingsFormExists(userData, btnName) {
    const {
      username,
      email: { normalEmail }
    } = userData;

    this.usernameField
      .should('exist')
      .and('be.visible')
      .and('contain.value', username);

    this.bioField
      .should('exist')
      .and('be.visible')
      .and('be.empty');

    this.emailField
      .should('exist')
      .and('be.visible')
      .and('contain.value', normalEmail);

    this.passwordField
      .should('exist')
      .and('be.visible')
      .and('be.empty');

    this.updateBtn
      .should('exist')
      .and('be.visible')
      .and('contain.text', btnName);
  }

  assertLogoutBtnExists(btnName) {
    this.logoutBtn
      .should('exist')
      .and('be.visible')
      .and('contain.text', btnName);
  }

  assertPasswordFieldEmpty() {
    this.passwordField
      .should('be.empty');
  }

  assertPasswordIsmasked() {
    this.passwordField
      .should('have.attr', 'type', 'password');
  }

  fillFormAndSubmit(newUserData) {
    const {
      username,
      bio,
      email: { normalEmail },
      password: { normalPassword }
    } = newUserData;

    cy.get('@testTitle').then((title) => {
      if (title.includes(`empty 'Username' field`)) {
        this.usernameField
          .clear();
        this.typeBio(bio);
        this.typeEmail(normalEmail);
        this.typePassword(normalPassword);
      }

      if (title.includes(`empty 'Email' field`)) {
        this.typeUsername(username);
        this.typeBio(bio);
        this.emailField
          .clear();
        this.typePassword(normalPassword);
      }

      if (title.includes(`updating email with`)) {
        cy.wrap(generateInvalidEmailForTest(title, newUserData.email))
          .then((invalidEmail) => {
            this.typeEmail(invalidEmail);
          });
      }

      if (title.includes(`update the password with`)) {
        cy.wrap(setPasswordForTest(title, newUserData.password))
          .then((password) => {
            this.typePassword(password);
          });
      }
    });

    this.clickOnUpdateBtn();
  }

  typeUsername(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }

  typeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickOnUpdateBtn() {
    this.updateBtn
      .click();
  }

  clickOnLogoutBtn() {
    this.logoutBtn
      .click();
  }

  assertUsernameUpdated(newUsername) {
    this.usernameField
      .should('contain.value', newUsername);
  }

  assertBioUpdated(bio) {
    this.bioField.should('contain.value', bio);
  }

  assertEmailUpdated(newEmail, userData) {
    this.emailField
      .should('contain.value', newEmail);

    this.clickOnLogoutBtn();

    const {
      username,
      password: { normalPassword }
    } = userData;

    cy.login(newEmail, normalPassword);

    new ProfilePageObject(username).visit();
    this.assertHeaderContainUsername(username);
  }

  assertPasswordUpdated(newPassword, userData) {
    this.clickOnLogoutBtn();

    const {
      username,
      email: { normalEmail }
    } = userData;

    cy.login(normalEmail, newPassword);

    new ProfilePageObject(username).visit();
    this.assertHeaderContainUsername(username);
  }
}

export default SettingsPageObject;
