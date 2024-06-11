import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.getByDataCy('signUpUsername').type(username);
  }

  typeEmail(email) {
    cy.getByDataCy('signUpEmail').type(email);
  }

  typePassword(password) {
    cy.getByDataCy('signUpPassword').type(password);
  }

  clickOnSignUpBtn() {
    cy.getByDataCy('signUpBtn').click();
  }

  assertMessageEmptyEmail() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Email field required.');
  }

  assertMessageEmptyUsername() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Username field required.');
  }

  assertMessageEmptyPassword() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Password field required');
  }
};
export default SignUpPageObject;
