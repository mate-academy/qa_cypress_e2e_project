/// <reference types = 'cypress'/>

import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  get usernameField() {
    return cy.getByDataCy('settings-username-field');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio-field');
  }

  get emailField() {
    return cy.getByDataCy('settings-email-field');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password-field');
  }

  get updateButton() {
    return cy.getByDataCy('settings-update-btn');
  }

  get logoutButton() {
    return cy.getByDataCy('settings-logout-btn');
  }

  get popUp() {
    return cy.get('.swal-modal');
  }

  get popUpOkButton() {
    return cy.get('.swal-button');
  }

  typeUsername(username) {
    this.usernameField
      .clear()
      .type(username);
  }

  typeBio(bio) {
    this.bioField
      .clear()
      .type(bio);
  }

  typeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .clear()
      .type(password);
  }

  updateButtonClick() {
    this.updateButton.click();
  }

  logoutButtonClick() {
    this.logoutButton.click();
  }

  assertHeaderContainUpdatedUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertBioContainUpdatedBio(updatedBio) {
    this.bioField
      .should('have.value', updatedBio);
  }

  assertEmailContainUpdatedEmail(updatedEmail) {
    this.emailField
      .should('contain', updatedEmail);
  }

  assertPopUp() {
    this.popUp.should('contain', 'Update successful!');
  }

  popUpOkButtonClick() {
    this.popUpOkButton
      .click();
  }
}

export default SettingsPageObject;
