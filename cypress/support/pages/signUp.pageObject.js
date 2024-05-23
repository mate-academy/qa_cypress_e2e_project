import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('input[placeholder="Username"]');
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get signUpBtn() {
    return cy.get('button.btn.btn-lg.btn-primary.pull-xs-right');
  }

  get errorMessageModal() {
    return cy.get('.swal-modal .swal-text');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  checkErrorMessage(message) {
    this.errorMessageModal.should('contain', message);
  }
}

export default SignUpPageObject;
