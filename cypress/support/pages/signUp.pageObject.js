import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get findUsernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  typeUsername(username) {
    this.findUsernameField.type(username);
  }

  get findEmailField() {
    return cy.getByDataCy('email-sign-up');
  }

  typeEmail(email) {
    this.findEmailField.type(email);
  }

  get findPasswordField() {
    return cy.getByDataCy('password-sign-up');
  }

  typePassword(password) {
    this.findPasswordField.type(password);
  }

  get findSignUpBtn() {
    return cy.getByDataCy('sign-up-button');
  }

  clickSignUpBtn() {
    this.findSignUpBtn.click();
  }

  get errorMessage() {
    return cy.get('body');
  }

  findErrorMessage(text) {
    this.errorMessage.should('contain.text', text);
  }
}

export default SignUpPageObject;
