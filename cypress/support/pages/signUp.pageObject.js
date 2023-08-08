import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.findByPlaceholder('Username');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.get('.btn');
  }

  get singUpModal() {
    return cy.get('.swal-modal');
  }

  typeUserName(userName) {
    this.userNameField.type(userName);
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

  assertRegistrationWasSuccessful() {
    this.singUpModal.should('contain', 'Your registration was successful!');
  }

  assertRegistrationFailed(errorMessage) {
    this.singUpModal.should('contain', 'Registration failed!');
    this.singUpModal.should('contain', errorMessage);
  }

  get swalButton() {
    return cy.get('.swal-button');
  }

  clickSwalBtn(text) {
    this.swalButton.contains(text).click();
  }
}

export default SignUpPageObject;
