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

  get modalOkBTN() {
    return cy.get('.swal-button');
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

    clickModalOkBTN() {
      this.modalOkBTN
        .click();
      }
  
    assertModalContent(content) {
      cy.get(".swal-modal").should("contain", content);
    }
}

export default SignInPageObject;
