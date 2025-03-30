import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  get dialogWindow(){
    return cy.get('div[role="dialog"]');
  }

  assertWrongCredentials(){
    this.dialogWindow.should('contain', 'Login failed!');
  }

  assertEmptyEmail(){
    this.dialogWindow.should('contain', 'Email field required.');
  }

  userLogin(email, password){
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
  }
}

export default SignInPageObject;
