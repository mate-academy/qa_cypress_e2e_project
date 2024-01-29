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

  get modalka() {
    return cy.get('.swal-modal');
  };

  get modalOkBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  get modalText() {
    return cy.get('.swal-text');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertModalWindowFail() {
    this.modalka.should('be.visible');
    this.modalka
      .should('contain', 'Login failed!');
    this.modalka.should('contain', 'Invalid user credentials.');
  };

  clickOkBtn() {
    this.modalOkBtn.should('contain', 'OK').click();
  }
}

export default SignInPageObject;
