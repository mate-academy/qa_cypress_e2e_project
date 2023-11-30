import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get modalTitle() {
    return cy.get('.swal-title');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
    }
    wrongRegistration(text) {
      console.log(this.modalTitle);
      this.modalTitle
        .should('contain', text);
    }
  }

export default SignUpPageObject;
