import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get modalTitle() {
    return cy.get('.swal-title');
  }

  typeEmail(email) {
    this.signInBtn
      .click();
  }

  verifyWrongLogin(state) {
    this.modalTitle.should('contain.text', state);
  }
}
export default SignInPageObject;
