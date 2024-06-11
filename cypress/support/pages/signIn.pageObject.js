import PageObject from '../PageObject';
import generateData from '../generate/index';

class SignInPageObject extends PageObject {
  url = '/#/login';

  genData = generateData();

  get needAnAccountLink() {
    return cy.getByDataCy('sign-in-need-account-link');
  }

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

  clickNeedAccountLink() {
    this.needAnAccountLink.click();
  }

  assertSignInPage() {
    this.signInBtn.should('contain', 'Sign in');
  }

  registrationForSignIn() {
    cy.register(this.genData.user.email.default,
      this.genData.user.username,
      this.genData.user.password.passwordDefault);
  }

  signInProcess(option = 'default', password) {
    if (option !== 'without registration') {
      this.registrationForSignIn();
    }
    if (option !== 'without email') {
      this.typeEmail(this.genData.user.email.default);
    }
    if (option !== 'without password') {
      this.typePassword(this.genData.user.password.passwordDefault);
    }

    this.clickSignInBtn();
  }

  signInConfirmProcess(email, password) {
    this.typeEmail(email);
    this.typePassword(password);

    this.clickSignInBtn();
  }
}

export default SignInPageObject;
