import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-field-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email, { force: true });
  }

  typePassword(password) {
    this.passwordField.type(password, { force: true });
  }

  clickSignInBtn() {
    this.signInBtn.click({ force: true });
  }
}

export default SignInPageObject;
