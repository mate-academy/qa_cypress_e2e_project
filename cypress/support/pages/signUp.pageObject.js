import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get modalTitle() {
    return cy.get('.swal-title');
  }

  typeUsername(username) {
    this.usernameField.should('be.visible').type(username);
  }

  typeEmail(email) {
    this.emailField.should('be.visible').type(email);
  }

  typePassword(password) {
    this.passwordField.should('be.visible').type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  checkModalTitle(text) {
    this.modalTitle.should('contain.text', text);
  }
}

export default SignUpPageObject;
