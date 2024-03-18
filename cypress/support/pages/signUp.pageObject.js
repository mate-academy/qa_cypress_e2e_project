import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.get(':nth-child(1) > .form-control').type(username);
  }

  typeEmail(email) {
    cy.get(':nth-child(2) > .form-control').type(email);
  }

  typePassword(password) {
    cy.get(':nth-child(3) > .form-control').type(password);
  }

  clickSignUpButton() {
    cy.get('.btn').click();
  }

  clickSomeButton() {
    cy.get('.swal-button').click();
  }
}

export default SignUpPageObject;
