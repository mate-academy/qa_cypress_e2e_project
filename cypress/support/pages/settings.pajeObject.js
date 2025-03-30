import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  url = '/#/settings'

  typeNewUsername(username) {
    cy.getByDataQa('username-settings')
      .clear()
      .type(username);
  }

  typeNewBio(bio) {
    cy.getByDataQa('bio-settings')
      .clear()
      .type(bio);
  }

  typeNewEmail(email) {
    cy.getByDataQa('email-settings')
      .clear()
      .type(email);
  }

  typeNewPassword(password) {
    cy.getByDataQa('password-settings')
      .clear()
      .type(password);
  }


  clickUpdateBtn() {
    cy.getByDataQa('update-btn-settings')
      .click();
  }

  clickLogoutBtn() {
    cy.getByDataQa('logout-btn-settings')
      .click();
  }

  get dialogWindow() {
    return cy.get('.swal-modal')
  }

  clickOkBtn() {
    cy.get('.swal-button.swal-button--confirm')
      .click();
  }

  assertEmailChanged(email) {
    cy.getByDataQa('email-settings')
      .should('contain', email)
  }
};

export default SettingsPageObject;