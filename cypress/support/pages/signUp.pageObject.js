import PageObject from './PageObject.js';

class SignUpPage extends PageObject {
  getPage() {
    return cy.get('[data-qa="register-page"]');
  }

  getHeading() {
    return cy.get('[data-qa="register-heading"]');
  }

  getLoginLink() {
    return cy.get('[data-qa="login-link"]');
  }

  getRegisterForm() {
    return cy.get('[data-qa="register-form"]');
  }

  getUsernameInput() {
    return cy.get('[data-qa="username-input"]');
  }

  getEmailInput() {
    return cy.get('[data-qa="email-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-qa="password-input"]');
  }

  getSignUpButton() {
    return cy.get('[data-qa="register-button"]');
  }

  fillRegisterForm(username, email, password) {
    this.getUsernameInput().type(username);
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);
  }

  submitRegisterForm() {
    this.getSignUpButton().click();
  }

  visit() {
    cy.visit('/#/register');
    this.getPage().should('be.visible');
  }
}

export default new SignUpPage();
