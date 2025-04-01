import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get submitBtn() {
    return cy.getByDataCy('submit');
  }

  get modal() {
    return cy.get('.swal-text');
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

  clickSubmit() {
    this.submitBtn
      .click();
  }

  checkModal(phrase) {
    this.modal.should('contain.text', phrase);
  }
}

export default SignUpPageObject;
