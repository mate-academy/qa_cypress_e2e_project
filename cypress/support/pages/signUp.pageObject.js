import PageObject from '../PageObject';
import HomePageObject from './home.pageObject';
const homePage = new HomePageObject();
class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataCy('usernameField');
  }

  get emailField() {
    return cy.getByDataCy('emailField');
  }

  get passwordField() {
    return cy.getByDataCy('passwordField');
  }

  get signUpBtn() {
    return cy.getByDataCy('submitBtn');
  }

  get modalMessage() {
    return cy.get('.swal-text');
  }

  get modalTitleMessage() {
    return cy.get('.swal-title');
  }

  get modalOkBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  typeUsername(name) {
    this.usernameField.type(name);
  }

  //   typeUsername(username) {
  //     this.usernameField.type(username);
  //   }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertModalHaveText(result) {
    this.modalMessage.should('contain.text', result);
  }

  clickSwallOk() {
    this.modalOkBtn.click();
  }

  assertModalTitle(result) {
    this.modalTitleMessage.should('contain.text', result);
  }
}

export default SignUpPageObject;
