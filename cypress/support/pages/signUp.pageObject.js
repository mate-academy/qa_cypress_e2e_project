class SignUpPageObject {
  visit() {
    cy.get('[data-qa=sign-up-link]').click();
  }

  typeUsername(username) {
    cy.get('[data-qa=sign-up-username-input]').type(username);
  }

  typeEmail(email) {
    cy.get('[data-qa=sign-up-email-input]').type(email);
  }

  typePassword(password) {
    cy.get('[data-qa=sign-up-password-input]').type(password);
  }

  clickSignUpButton() {
    cy.get('[data-qa=sign-up-button]').click();
  }

  assertUserLoggedIn(username) {
    cy.get('[data-qa=username-link]').should('contain.text', username);
  }

  assertSignUpError() {
    cy.get('[data-qa=sign-up-error]').should('be.visible');
  }
}

export default SignUpPageObject;
