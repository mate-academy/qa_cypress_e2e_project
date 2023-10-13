import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email_sign-in');
  }

    get passwordField() {
      return cy.getByDataCy('password_sign-in');
    }

  get signInBtn() {
    return cy.contains('button', 'Sign in');
  }

  get failedLoginAlert() {
    return cy.get('.swal-title');
  }

  get invalidCredentialsAlert() {
    return cy.get('.swal-text');
  }

  isLoginFailed() {
    this.failedLoginAlert
      .contains('Login failed!');
  }

      isEmailEmpty() {
        this.invalidCredentialsAlert
          .contains('Email field required.');
      }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

 
}

export default SignInPageObject;
