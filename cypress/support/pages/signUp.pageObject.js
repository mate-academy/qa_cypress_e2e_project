import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameInput() {
    return cy.getByDataQa('username-sign-up');
  }

  get emailInput() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordInput() {
    return cy.getByDataQa('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get swalBtn() {
    return cy.get('.swal-button');
  }

  typeUserName(username) {
    this.usernameInput.type(username);
  }

  typeEmail(email) {
    this.emailInput.type(email);
  }

  typePassword(password) {
    this.passwordInput.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  clickSwalBtn() {
    this.swalBtn.click();
  }
}

export default SignUpPageObject;
