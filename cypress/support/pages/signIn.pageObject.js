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

  typeEmail(email) {
    if (this.emailField) {
      this.emailField.type(email);
    } else {
      throw new Error('Email field is not available.');
    }
  }

  typePassword(password) {
    if (this.passwordField) {
      this.passwordField.type(password);
    } else {
      throw new Error('Password field is not available.');
    }
  }

  typeLoginCredentials(email, password) {
    if (email) {
      this.typeEmail(email);
    }
    if (password) {
      this.typePassword(password);
    }
  }

  clickOnSignInButton() {
    this.signInBtn
      .click();
  }

  performLogin(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickOnSignInButton();
  }

  validateEmailAndPassword(email, password) {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }
  }
}

export default SignInPageObject;
