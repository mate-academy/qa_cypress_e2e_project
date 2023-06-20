import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  typeEmail(email) {
    cy.getByDataCy('email-sign-in')
      .type(email);
  }

  typePassword(password) {
    cy.getByDataCy('password-sign-in')
      .type(password);
  }

  clickSignInBtn() {
    cy.getByDataCy('sign-in-btn')
      .click();
  }

  login(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
  }

  createWrongValue(correctValue) {
    const wrongVal = `${correctValue}777`;
    return wrongVal;
  }

  loginWrongEmail(email, password) {
    const wrongVal = this.createWrongValue(email);
    this.login(wrongVal, password);
  }

  loginWrongPassword(email, password) {
    const wrongVal = this.createWrongValue(password);
    this.login(email, wrongVal);
  }

  get loginFailed() {
    return cy.get('.swal-modal');
  }

  assertloginFailed (message, message2) {
    this.loginFailed.should('contain', message)
      .and('contain', message2);
  }
}

export default SignInPageObject;
