/* eslint-disable max-len */
/// <reference types='cypress' />
import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  enterUsername(username) {
    cy.getByPlaceholder('Username').type(username);
  }

  enterEmail(email) {
    cy.getByPlaceholder('Email').type(email);
  }

  enterPassword(password) {
    cy.getByPlaceholder('Password').type(password);
  }

  get SignUpBtn() {
    return cy.contains('.btn', 'Sign up');
  }

  clickOnSignUpBtn() {
    this.SignUpBtn.click();
  }

  registrationAlert(username) {
    cy.get('.swal-modal').should('contain', 'Your registration was successful!');
    cy.contains('.swal-button-container', 'OK').click();
    cy.get('[data-cy="username-link"]').should('contain', username);
  }

  failedRegistrationAlert() {
    cy.get('.swal-modal').should('contain', 'Registration failed!');
  }

  emtyUsernameAlert() {
    cy.get('.swal-modal').should('contain', 'Username field required.');
  }

  emtyEmailAlert() {
    cy.get('.swal-modal').should('contain', 'Email field required.');
  }

  emtyPasswordAlert() {
    cy.get('.swal-modal').should('contain', 'Password field required.');
  }
}

export default SignUpPageObject;
