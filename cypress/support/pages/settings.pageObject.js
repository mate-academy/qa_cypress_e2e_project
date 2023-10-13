import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = 'http://localhost:1667/#/settings';

  get userNameField() {
    return cy.get('[data-qa="User name"]').click();
  }

  get bioField() {
    return cy.get('[data-qa="User bio"]').click();
  }

  get emailField() {
    return cy.get('[data-qa="User Email"]').click();
  }

  get passwordField() {
    return cy.get('[data-qa="User password"]').click();
  }

  get updateSettingsBtn() {
    return cy.get('[data-qa="Update Settings Btn"]');
  }

  get logOutBtn() {
    return cy.get('[data-qa="Log Out Btn"]');
  }

  get updateSuccessPopUp() {
    return cy.get('.swal-modal');
  };

  get popUpBtn() {
    return cy.get('.swal-modal').should('contain',
      'Update successful!')
      .find('.swal-button');
  };

  assertBio(bio) {
    this.bioField.should('have.value', bio);
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }

  clickPopUpBtn() {
    this.popUpBtn.click();
  }

  assertSuccessPopUp() {
    this.updateSuccessPopUp
      .should('contain', 'Update successful!');
  }

  UpdateUserName(name) {
    this.userNameField.clear()
      .type(name);
  }

  UpdateUserEmail(email) {
    this.emailField.clear()
      .type(email);
  }

  UpdateUserPassword(password) {
    this.passwordField.clear()
      .type(password);
  }

  UpdateUserBio(bio) {
    this.bioField.clear()
      .type(bio);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  visit() {
    cy.visit(this.url);
  }

  assertUrl() {
    cy.url().should('eq', this.url);
  }
}

export default SettingsPageObject;
