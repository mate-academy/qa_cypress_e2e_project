import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsernameField(username) {
    cy.getByDataCy('username-sign-up')
      .type(username);
  }

  typeEmailField(email) {
    cy.getByDataCy('email-sign-up')
      .type(email);
  }

  typePasswordField(password) {
    cy.getByDataCy('password-sign-up')
      .type(password);
  }

  clickSignUpBtn() {
    cy.getByDataCy('sign-up-button')
      .click();
  }

  assertSuccessfulRegistration(text1, text2) {
    cy.get('.swal-title')
      .should('contain', text1);
    cy.get('.swal-text')
      .should('contain', text2);
  }

  assertEmptyRequiredField(text1, text2) {
    cy.get('.swal-title')
      .should('contain', text1);
    cy.get('.swal-text')
      .should('contain', text2);
  }
  assertWrongData(text1, text2) {
    cy.get('.swal-title')
      .should('contain', text1);
    cy.get('.swal-text')
      .should('contain', text2);
  }

}

export default SignUpPageObject;