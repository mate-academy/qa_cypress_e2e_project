import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.getByDataCy('signUpUsername')
      .type(username);
  }

  typeEmail(email) {
    cy.getByDataCy('signUpEmail')
      .type(email);
  }

  typePassword(password) {
    cy.getByDataCy('signUpPassword')
      .type(password);
  }

  clickOnSignUp() {
    cy.getByDataCy('signUpBtn')
      .click();
  }

  get modalWindow() {
    return cy.get('.swal-text');
  }
}

export default SignUpPageObject;
