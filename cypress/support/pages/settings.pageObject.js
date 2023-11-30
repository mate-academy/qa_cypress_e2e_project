import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get updateUsernameField() {
    return cy.getByDataQaPlaceholder('Your username');
  }

  get updateSettingsBtn() {
    return cy.getByDataQaBtn('btn btn-lg btn-primary pull-xs-right');
  }

  get Message() {
    return cy.get('.swal-title');
  }

  get updateUserBio() {
    return cy.getByDataQaPlaceholder('Short bio about you');
  }

  get successfulAssertBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  get userInfoWindow() {
    return cy.getByDataQaBtn('col-xs-12 col-md-10 offset-md-1');
  }

  get updateUserEmailField() {
    return cy.getByDataQaPlaceholder('Email');
  }

  get logoutBtn() {
    return cy.getByDataQaBtn('btn btn-outline-danger');
  }

  get updatePasswordField() {
    return cy.getByDataQaPlaceholder('Password');
  }

  typeNewUsername(username) {
    this.updateUsernameField
      .clear().type(username);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  assertSuccessfulUpdate() {
    this.Message
      .should('contain', 'Update successful!');
  }

  typeUpdateUserBio(bio) {
    this.updateUserBio
      .clear().type(bio);
  }

  clickOnsuccessfulAssertBtn() {
    this.successfulAssertBtn.click();
  }

  typeNewUseremail(email) {
    cy.wait(4000);
    this.updateUserEmailField
      .clear().type(email);
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }

  typeNewPassword(password) {
    cy.wait(4000);
    this.updatePasswordField
      .clear().type(password);
  }
}

export default SettingsPageObject;
