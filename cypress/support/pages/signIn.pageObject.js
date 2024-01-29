import PageObject from '../PageObject';
const username = 'test134';

class SignInPageObject extends PageObject {
  url = 'http://localhost:1667/#/login';

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get signInLink() {
    return cy.get(':nth-child(2) > .nav-link');
  }

  signInLinkClick() {
    this.signInLink.click();
  }

  get usernameLink() {
    return cy.get('[data-cy="username-link"]');
  }

  assertSuccessfullRegistration() {
    this.usernameLink.should('contain', username);
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  assertSuccessLoginModal() {
    this.modalWindow.should('contain', 'Your registration was successful!');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typeNewPassword(newPassword) {
    this.passwordField.type(newPassword);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertUnSuccessModal(field) {
    this.modalWindow.should('contain', 'Login failed!');
    this.modalWindow.should('contain', field + ' field required.');
  }

  assertUnSuccessLogin() {
    this.modalWindow.should('contain', 'Login failed!');
    this.modalWindow.should('contain', 'Invalid user credentials.');
  }
}
export default SignInPageObject;
