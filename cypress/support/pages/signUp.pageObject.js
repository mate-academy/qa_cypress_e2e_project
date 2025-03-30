import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/register';

  signUpForTests(Username, Email, Password) {
    cy.findByPlaceholder('Username').type(Username);
    cy.findByPlaceholder('Email').type(Email);
    cy.findByPlaceholder('Password').type(Password);
    cy.contains(`button`, `Sign up`).click();
  }

  signUpWithEmptyEmail(Username, Password) {
    cy.findByPlaceholder('Username').type(Username);
    cy.findByPlaceholder('Password').type(Password);
    cy.contains(`button`, `Sign up`).click();
  }

  signUpWithEmptyUsername(Email, Password) {
    cy.findByPlaceholder('Email').type(Email);
    cy.findByPlaceholder('Password').type(Password);
    cy.contains(`button`, `Sign up`).click();
  }

  signUpWithEmptyPassword(Username, Email) {
    cy.findByPlaceholder('Username').type(Username);
    cy.findByPlaceholder('Email').type(Email);
    cy.contains(`button`, `Sign up`).click();
  }

  assertMassage(message) {
    cy.get('.swal-text').should('contain', message);
    cy.contains('button', 'OK').click();
  }

  assertAfterSingUpByUsername(username) {
    cy.contains(`a`, username)
      .should(`be.visible`);
  }
}
export default SignUpPageObject;
