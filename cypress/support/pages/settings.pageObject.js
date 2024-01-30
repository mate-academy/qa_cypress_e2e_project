import PageObject from '../PageObject';

export class SettingsPageObject extends PageObject {
  url = '/#/settings';
  get emailField() {
    return cy.getByDataQa('email-field');
  }

  get usernameField() {
    return cy.getByDataQa('username-field');
  }

  get usernameCheck() {
    return cy.get('[data-qa="profile-link"]');
  }

  get passwordField() {
    return cy.getByDataQa('password-field');
  }

  get bioField() {
    return cy.getByDataQa('bio-field');
  }

  get updateSettingsButton() {
    return cy.getByDataQa('update-button');
  }

  get logoutButton() {
    return cy.getByDataQa('logout-button');
  }
}
