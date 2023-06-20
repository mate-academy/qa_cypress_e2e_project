import PageObject from "../PageObject";
import faker from "faker";

class SettingsPage extends PageObject {
  url = '#/settings';

  clickUpdateBtn() {
    cy.getByDataCy('update-setting-btn')
      .click();
  }

  clearBio() {
    cy.getByDataCy('textarea-bio')
      .clear();
  }

  typeBio(bio) {
    cy.getByDataCy('textarea-bio')
      .type(bio);
  }

  checkBioData(bio) {
    cy.visit(this.url);
    cy.getByDataCy('textarea-bio')
      .should('have.value', bio);
  }

  clearUsername() {
    cy.getByDataCy('input-username')
      .clear();
  }

  typeUsername(userName) {
    cy.getByDataCy('input-username')
      .type(userName);
  }

  checkUserNameData(userName) {
    cy.visit(this.url);
    cy.getByDataCy('input-username')
      .should('have.value', userName);
  }

  clearEmail() {
    cy.getByDataCy('input-email')
      .clear();
  }

  typeEmail(email) {
    cy.getByDataCy('input-email')
      .type(email);
  }

  checkEmail(email) {
    cy.visit(this.url);
    cy.getByDataCy('input-email')
      .should('have.value', email);
  }

  clearPassword() {
    cy.getByDataCy('input-password')
      .clear();
  }

  typePassword(password) {
    cy.getByDataCy('input-password')
      .type(password);
  }

  get successfulUpdate() {
    return cy.get('.swal-modal');
  }

  assertSuccessfulUpdate (message) {
    this.successfulUpdate.should('contain', message);
  }

  clickLogoutButton() {
    cy.getByDataCy('logout-btn').click();
  }

  assertLogout() {
    cy.getByDataCy('signIn-link')
      .should('contain', 'Sign in');
  }
}

export default SettingsPage;
