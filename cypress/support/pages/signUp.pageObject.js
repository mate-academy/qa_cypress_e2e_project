import PageObject from '../PageObject';

class SignUnPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataQA('sign-up-username-field');
  }

  get emailField() {
    return cy.getByDataQA('email-sign-up-field');
  }

  get passwordField() {
    return cy.getByDataQA('password-sign-up-field');
  }

  get signUnBtn() {
    return cy.getByDataQA('sign-up-btn');
  }

  get modalWindow() {
    return cy.get('.swal-text');
  }

  closeModalWindow() {
    cy.get('.swal-button')
      .click();
  }
}

export default SignUnPageObject;
