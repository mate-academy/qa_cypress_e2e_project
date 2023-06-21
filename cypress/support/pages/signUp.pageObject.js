import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsernameField(username) {
    cy.getByDataCy('sign-up-username')
      .type(username);
  }

  typeEmailField(email) {
    cy.getByDataCy('sign-up-email')
      .type(email);
  }

  typePasswordField(password) {
    cy.getByDataCy('sign-up-password')
      .type(password);
  }

  clickSignUpBtn() {
    cy.getByDataCy('sign-up-btn')
      .click();
  }

  assertSuccessfulRegistration(modalText, modalText1) {
    cy.get('.swal-title')
      .should('contain', modalText);
    cy.get('.swal-text')
      .should('contain', modalText1);
  }

  assertWrongEmail(modalText, modalText1) {
    cy.get('.swal-title')
      .should('contain', modalText);
    cy.get('.swal-text')
      .should('contain', modalText1);
  }

  assertWrongPassword(modalText, modalText1) {
    cy.get('.swal-title')
      .should('contain', modalText);
    cy.get('.swal-text')
      .should('contain', modalText1);
  }
}

export default SignUpPageObject;