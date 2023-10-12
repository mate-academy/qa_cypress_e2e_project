import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('signup-username');
  }

  get emailField() {
    return cy.getByDataCy('signup-email');
  }

  get passwordField() {
    return cy.getByDataCy('signup-password');
  }

  get signUpBtn() {
    return cy.getByDataCy('signup-btn');
  }

  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickSignupBtn() {
    this.signUpBtn.click();
  }

  checkSuccesModal() {
    cy.get('.swal-modal').should('contain', 'Your registration was successful!')
      .find('.swal-button').click();
  }

  checkFailedModal() {
    cy.get('.swal-modal').should('contain', 'Registration failed!')
      .find('.swal-button').click();
  }

  checkFailedEmailModal() {
    cy.get('.swal-modal').should('contain', 'Email already taken.')
      .find('.swal-button').click();
  }
}

export default SignUpPageObject;
