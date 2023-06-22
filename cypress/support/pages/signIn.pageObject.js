import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickOnSignInBtn() {
    this.signInBtn.click();
  }

  signInWithUpdatedCredentials(email, password) {
    cy.clearCookies();
    cy.reload();
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signInBtn.click();
  }
}

export default SignInPageObject;

