import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return cy.get('input[placeholder="Email"]', { timeout: 10000 });
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get signInBtn() {
    return cy.get('.btn.btn-lg.btn-primary.pull-xs-right');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  fillSignInForm(user) {
    this.typeEmail(user.email);
    this.typePassword(user.password);
  }

  registerAndSignIn(user) {
    cy.register(user);
    this.fillSignInForm(user);
    this.clickSignInBtn();
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }
}

export default SignInPageObject;
