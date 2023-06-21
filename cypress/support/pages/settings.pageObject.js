import PageObject from '../PageObject';

export default class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQA('username-input');
  }

  get userBioField() {
    return cy.getByDataQA('user-bio-input');
  }

  get emailField() {
    return cy.getByDataQA('email-input');
  }

  get passwordField() {
    return cy.getByDataQA('password-input');
  }

  get updateBtn() {
    return cy.getByDataQA('update-Btn');
  }

  get logoutBtn() {
    return cy.get('.btn-outline-danger');
  }
}
