class SignUpPageObject {
  visit() {
    cy.visit('/register');
  }

  typeEmail(email) {
    cy.get('[data-qa="email"]').type(email);
  }

  typeUsername(username) {
    cy.get('[data-qa="username"]').type(username);
  }

  typePassword(password) {
    cy.get('[data-qa="password"]').type(password);
  }

  clickSignUpBtn() {
    cy.get('[data-qa="sign-up-btn"]').click();
  }

  assertSignUpFailed() {
    cy.get('[data-qa="sign-up-error"]').should('be.visible');
  }
}

export default SignUpPageObject;
