import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.getByDataCy('sign-up-username').type(username);
  }

  typeEmail(email) {
    cy.getByDataCy('sign-up-email').type(email);
  }

  typePassword(password) {
    cy.getByDataCy('sign-up-password').type(password);
  }

  clickOnSignUpBtn() {
    cy.getByDataCy('sign-up-btn').click();
  }

  assertWindowForFailedSignUp(message) {
    cy.get('.swal-modal').should('contain', message);
  }
}

export default SignUpPageObject;
