class SignInPageObject {
  visit() {
    cy.visit('/login');
  }

  typeEmail(email) {
    cy.get('[data-qa="email"]').type(email);
  }

  typePassword(password) {
    cy.get('[data-qa="password"]').type(password);
  }

  clickSignInBtn() {
    cy.get('[data-qa="sign-in-btn"]').click();
  }

  assertLoginFailed() {
    cy.get('[data-qa="login-error"]').should('be.visible');
  }
}

export default SignInPageObject;
