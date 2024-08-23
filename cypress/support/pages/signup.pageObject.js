import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  userNameFieldType(username) {
    cy.getByDataCy('username-sign-up').type(username);
  }

  emailFieldType(username) {
    cy.getByDataCy('email-sign-up').type(username);
  }

  passwordFieldType(username) {
    cy.getByDataCy('password-sign-up').type(username);
  }

  signUpBtnClick() {
    cy.getByDataCy('button-sign-up').click();
  }

  profileLinkCheck(username) {
    cy.getByDataCy('username-link').contains(username);
  }

  checkRegistration(text) {
    cy.get('.swal-text').should('contain', text);
  }
}

export default SignUpPageObject;