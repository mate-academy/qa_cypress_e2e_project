import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataCy('username-field-sign-up');
  };

  get emailField() {
    return cy.getByDataCy('email-field-sign-up');
  };

  get passwordField() {
    return cy.getByDataCy('password-field-sign-up');
  };

  get signUpBtn () {
    return cy.getByDataCy('sign-up-btn');
  };

  get signUpLink() {
    return cy.getByDataCy('sign-up-link');
  };

  get signUpTitle() {
    return cy.getByDataCy('sign-up-title');
  };

  get haveAccountLink() {
    return cy.getByDataCy('have-account-link');
  };

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
    this.emailField.type(email);
  };

  typeUserName(username) {
    this.userNameField.type(username);
  };

  typePassword(password) {
    this.passwordField.type(password);
  };

  clickSingUpBtn(button) {
    this.signUpBtn.click(button);
  };

  assertNoSignUpLink() {
    this.signUpLink.should('not.exist');
  };

  assertTitleSignUpPage() {
    this.signUpTitle.contains('Sign up').should('be.visible');
  };

  clickHaveAccountLink() {
    this.haveAccountLink.click();
    cy.reload();
    // this.url.should('not.exist');
  };

  assertModalWindow() {
    this.modalka.should('be.visible');
    this.modalka.should('contain', 'Your registration was successful!');
  };

  assertModalWindowFail() {
    this.modalka.should('be.visible');
    this.modalka
      .should('contain', 'Registration failed!', 'Username field required.');
  }

  assertModalFailForEmail() {
    this.modalka.should('be.visible');
    this.modalka
      .should('contain', 'Registration failed!');
    this.modalText.should('be.visible');
    this.modalText.should('contain', 'Email must be a valid email.');
  };

  assertModalFailForPassword() {
    this.modalka.should('be.visible');
    this.modalka
      .should('contain', 'Registration failed!');
    this.modalText.should('be.visible');
    // eslint-disable-next-line max-len
    this.modalText.should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  };

  clickOkBtn() {
    this.modalOkBtn.should('contain', 'OK').click();
  }
};

export default SignUpPageObject;
