import PageObject from './PageObject.js';

class SignInPage extends PageObject {
  getPage() {
    return cy.get('[data-qa="login-page"]');
  }

  getHeading() {
    return cy.get('[data-qa="login-heading"]');
  }

  getRegisterLink() {
    return cy.get('[data-qa="register-link"]');
  }

  getLoginForm() {
    return cy.get('[data-qa="login-form"]');
  }

  getEmailInput() {
    return cy.get('[data-qa="email-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-qa="password-input"]');
  }

  getSignInButton() {
    return cy.get('[data-qa="login-button"]');
  }

  fillLoginForm(email, password) {
    this.getEmailInput().type(email);
    this.getPasswordInput().type(password);
  }

  submitLoginForm() {
    this.getSignInButton().click();
  }

  visit() {
    cy.visit('/#/login');
    this.getPage().should('be.visible');
  }
}

export default new SignInPage();
