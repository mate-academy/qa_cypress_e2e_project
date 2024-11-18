import PageObject from '../PageObject';

class SettingPageObject extends PageObject {
  get userNameField() {
    return cy.getByDataCy('Username').clear();
  }

  get emailField() {
    return cy.getByDataCy('Email').clear();
  }

  get passwordField() {
    return cy.getByDataCy('Password').clear();
  }

  get updateButton() {
    return cy.get('form > :nth-child(1) > .btn');
  }

  get logoutButton() {
    return cy.get('.btn-outline-danger');
  }

  get bioField() {
    return cy.getByDataCy('Short bio about you').clear();
  }

  typeUserName(username) {
    this.userNameField.type(username);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateButton() {
    this.updateButton.click();
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  reloadPage() {
    return cy.reload();
  }
}

export default SettingPageObject;
