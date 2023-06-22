import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }
  typeEmailField(email) {
    cy.getByDataCy('email-sign-in')
      .type(email);
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }
  typePasswordField(password) {
    cy.getByDataCy('password-sign-in')
      .type(password);
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  assertWrongCredentials(text, text1) {
    cy.get('.swal-title')
      .should('contain', text);
      cy.get('.swal-text')
        .should('contain', text1);
  }
  
}

export default SignInPageObject;
