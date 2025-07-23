/// <reference types="cypress" />
/// <reference types="../../support" />

import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

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
    return cy.getByDataCy('settings-update-button');
  }

  typeUsername(username) {
    return this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    return this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    return this.emailField.clear().type(email);
  }

  typePassword(password) {
    return this.passwordField.type(password);
  }

  clickOnUpdateButtonAndWait() {
    cy.intercept('POST', '/user').as('updateRequest');
    this.updateButton.click();

    cy.wait('@updateRequest');
  }
}

export default SettingsPageObject;
