import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  typeUsername(username) {
    cy.getByDataCy('signUp-username-input')
      .type(username);
  }

  typeEmail(email) {
    cy.getByDataCy('signUp-email-input')
      .type(email);
  }

  typePassword(password) {
    cy.getByDataCy('signUp-password-input')
      .type(password);
  }

  clickSignUpBtn() {
    cy.getByDataCy('signUp-btn')
      .click();
  }

  signUp(username, email, password) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignUpBtn();
  }

  get signUpFailed() {
    return cy.get('.swal-modal');
  }

  assertsignUpFailed (message, message2) {
    this.signUpFailed.should('contain', message)
      .and('contain', message2);
  }
}

export default SignUpPageObject;
