import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/login';
    this.emailField = () => cy.get('[data-qa="login-email"]');
    this.passwordField = () => cy.get('[data-qa="login-password"]');
    this.signInBtn = () => cy.get('[data-qa="sign-in-btn"]');
  }

  visitPage() {
    super.visit(this.url);
  }

  typeEmail(email) {
    this.emailField().clear().type(email);
  }

  typePassword(password) {
    this.passwordField().clear().type(password);
  }

  clickSignInBtn() {
    this.signInBtn().should('be.visible').click();
  }
}

export default SignInPageObject;
