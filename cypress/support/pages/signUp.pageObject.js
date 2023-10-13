import PageObject from '../PageObject';
import faker from 'faker';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  static generateFakeData() {
    const fakeData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    return fakeData;
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpButton() {
    return cy.getByDataCy('sign-up-btn-btn');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(`QA${email}`);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignUpBtn() {
    this.signUpButton.click();
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  assertFailModal() {
    this.modalWindow.should('contain', 'Registration failed!')
      .find('.swal-button').click();
  }

  assertSuccModal() {
    this.modalWindow.should('contain', 'Your registration was successful!')
      .find('.swal-button').click();
  }
}

export default SignUpPageObject;
