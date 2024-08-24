/// <reference types="cypress" />

import PageObject from '../PageObject';
import {
  generateInvalidEmailForTest,
  setPasswordForTest
} from '../data_generation/dataForSpecificTest';

class SignUpPageObject extends PageObject {
  constructor() {
    super();

    this.url = `#/register`;
  }

  get linkToSignInPage() {
    return cy.getByDataQa('link-to-sign-in-page');
  }

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQa('btn-sign-up');
  }

  assertLinkHaveAccountExists(accountExists) {
    this.linkToSignInPage
      .should('exist')
      .and('be.visible')
      .and('contain.text', accountExists);
  }

  clickOnHaveAccountLink() {
    this.linkToSignInPage
      .click();
  }

  assertSignUpFormExists(btnName) {
    this.usernameField
      .should('exist')
      .and('be.visible');

    this.emailField
      .should('exist')
      .and('be.visible');

    this.passwordField
      .should('exist')
      .and('be.visible');

    this.signUpBtn
      .should('exist')
      .and('be.visible')
      .and('contain.text', btnName);
  }

  fillFormAndSubmit(userData) {
    const {
      username,
      email: { normalEmail },
      password: { normalPassword }
    } = userData;

    cy.get('@testTitle').then((title) => {
      if (title.includes(`empty 'Username' field`)) {
        this.typeEmail(normalEmail);
        this.typePassword(normalPassword);
      }

      if (title.includes(`empty 'Email' field`)) {
        this.typeUsername(username);
        this.typePassword(normalPassword);
      }

      if (title.includes(`empty 'Password' field`)) {
        this.typeUsername(username);
        this.typeEmail(normalEmail);
      }

      if (title.includes(`register with email`)) {
        cy.wrap(generateInvalidEmailForTest(title, userData.email))
          .then((invalidEmail) => {
            this.typeUsername(username);
            this.typeEmail(invalidEmail);
            this.typePassword(normalPassword);
          });
      }

      if (title.includes(`register with password`)) {
        cy.wrap(setPasswordForTest(title, userData.password))
          .then((password) => {
            this.typeUsername(username);
            this.typeEmail(normalEmail);
            this.typePassword(password);
          });
      }
    });

    this.clickOnSignUpBtn();
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickOnSignUpBtn() {
    this.signUpBtn
      .click();
  }

  assertPasswordIsmasked() {
    this.passwordField
      .should('have.attr', 'type', 'password');
  }
}

export default SignUpPageObject;
