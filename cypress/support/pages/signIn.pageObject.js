/// <reference types="cypress" />

import PageObject from '../PageObject';
import {
  generateInvalidEmailForTest
} from '../data_generation/dataForSpecificTest';

class SignInPageObject extends PageObject {
  constructor() {
    super();

    this.url = `#/login`;
  }

  get linkToSignUpPage() {
    return cy.getByDataQa('link-to-sign-up-page');
  }

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('btn-sign-in');
  }

  assertLinkNeedAccountExists(noAccountExist) {
    this.linkToSignUpPage
      .should('exist')
      .and('be.visible')
      .and('contain.text', noAccountExist);
  }

  clickOnNeedAccountLink() {
    this.linkToSignUpPage
      .click();
  }

  assertSignInFormExists(btnName) {
    this.emailField
      .should('exist')
      .and('be.visible');

    this.passwordField
      .should('exist')
      .and('be.visible');

    this.passwordField
      .should('exist')
      .and('be.visible');

    this.signInBtn
      .should('exist')
      .and('be.visible')
      .and('contain.text', btnName);
  }

  fillFormAndSubmit(userData) {
    const {
      email: { normalEmail },
      password: { normalPassword }
    } = userData;

    cy.get('@testTitle').then((title) => {
      if (title.includes(`empty 'Email' field`)) {
        this.typePassword(normalPassword);
      }

      if (title.includes(`empty 'Password' field`)) {
        this.typeEmail(normalEmail);
      }

      if (title.includes(`log in with email`)) {
        cy.wrap(generateInvalidEmailForTest(title, userData.email))
          .then((invalidEmail) => {
            this.typeEmail(invalidEmail);
            this.typePassword(normalPassword);
          });
      }
    });

    this.clickOnSignInBtn();
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickOnSignInBtn() {
    this.signInBtn
      .click();
  }

  assertPasswordIsmasked() {
    this.passwordField
      .should('have.attr', 'type', 'password');
  }
}

export default SignInPageObject;
