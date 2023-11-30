import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataQa('username-field-signup');
  }

  get emailField() {
    return cy.getByDataQa('email-field-signup');
  }

  get passwordField() {
    return cy.getByDataQa('password-field-signup');
  }

  get signUpBtn() {
    return cy.getByDataQa('signup-btn');
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  typeUserName(username) {
    this.userNameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertSignedUp() {
    cy.url().should('include', '/#/');
  }

  assertSuccessModal() {
    this.modalWindow.should('contain', 'Your registration was successful!')
      .find('.swal-button').click();
  }

  assertUnSuccessModal(field) {
    this.modalWindow.should('contain', 'Registration failed!');
    this.modalWindow.should('contain', field + ' field required.');
  }

  assertUnSuccessEmail() {
    this.modalWindow.should('contain', 'Registration failed!');
    this.modalWindow.should('contain', 'Email already taken');
  }
}

export default SignUpPageObject;
