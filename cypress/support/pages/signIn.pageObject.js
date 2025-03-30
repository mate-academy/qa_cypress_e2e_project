import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/login';

  registerAndLogin(email, username, password) {
    cy.registerAndLogin(email, username, password);
  }

  registerOnly(email, username, password) {
    cy.registerAndLogin(email, username, password);
  }

  signInForTests(Email, Password) {
    cy.findByPlaceholder('Email').type(Email);
    cy.findByPlaceholder('Password').type(Password);
    cy.contains(`button`, `Sign in`).click();
  }

  signInWithEmptyEmail(Password) {
    cy.findByPlaceholder('Password').type(Password);
    cy.contains(`button`, `Sign in`).click();
  }

  signInWithEmptyPassword(Email) {
    cy.findByPlaceholder('Email').type(Email);
    cy.contains(`button`, `Sign in`).click();
  }

  assertSignInPageURL() {
    cy.url().should('include', '/login');
  }

  assertAfterLoginByUsername(username) {
    cy.contains(`a`, username)
      .should(`be.visible`);
  }
}

export default SignInPageObject;
