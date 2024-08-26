import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';
  fillUsername(username) {
    cy.getByDataCy('username').clear().type(username);
  }

  fillEmail(email) {
    cy.getByDataCy('email').clear().type(email);
  }

  fillPassword(password) {
    cy.getByDataCy('password').clear().type(password);
  }

  submit() {
    cy.getByDataCy('signup-btn').click();
  }

  assertModalContent(content) {
    cy.get('.swal-modal').should('contain', content);
  }
}

export default SignUpPageObject;
