import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/register';
    this.usernameField = () => cy.get('[data-qa="signup-username"]');
    this.emailField = () => cy.get('[data-qa="signup-email"]');
    this.passwordField = () => cy.get('[data-qa="signup-password"]');
    this.signUpBtn = () => cy.get('[data-qa="sign-up-btn"]');
  }

  visitPage() {
    super.visit(this.url);
  }

  typeUsername(username) {
    this.usernameField().clear().type(username);
  }

  typeEmail(email) {
    this.emailField().clear().type(email);
  }

  typePassword(password) {
    this.passwordField().clear().type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn().should('be.visible').click();
  }

  assertSignedUp(username) {
    cy.get('[data-qa="profile-link"]').should('contain.text', username);
  }
}

export default SignUpPageObject;
