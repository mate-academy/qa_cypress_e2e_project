import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  typeEmailField(email) {
    cy.getByDataCy('email-sign-in')
      .type(email);
  }

  typePasswordField(password) {
    cy.getByDataCy('password-sign-in')
      .type(password);
  }

  clickSignInBtn() {
    cy.getByDataCy('sign-in-btn')
      .click();
  }

  assertWrongData(modalText, modalText1) {
    cy.get('.swal-title')
      .should('contain', modalText);
    cy.get('.swal-text')
      .should('contain', modalText1);
  }
}

export default SignInPageObject;
