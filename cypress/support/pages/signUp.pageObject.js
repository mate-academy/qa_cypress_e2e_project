import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.findByPlaceholder('Username');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.get('.btn');
  }

  typeUsername(usrName) {
    this.usernameField
      .type(usrName);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  assertModalData(modalText, modalText1) {
    cy.get('.swal-title')
      .should('contain', modalText);
    cy.get('.swal-text')
      .should('contain', modalText1);
  }
}

export default SignUpPageObject;
