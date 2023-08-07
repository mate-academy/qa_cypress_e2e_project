import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  typeUsername(username) {
    cy.getByDataCy('sign-up-username').type(username);
  }

  typeEmail(email) {
    cy.getByDataCy('email-sign-in').type(email);
  }

  typePassword(password) {
    cy.getByDataCy('password-sign-in').type(password);
  }

  clickSignInBtn() {
    cy.getByDataCy('sign-in-btn').click();
  }

  assertWindowForFailedLogin(message) {
    cy.get('.swal-modal').should('contain', message);
  }
}

export default SignInPageObject;
