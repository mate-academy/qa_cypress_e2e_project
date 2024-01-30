/* eslint-disable cypress/no-unnecessary-waiting */
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByPlaceholder('Your username');
  }

  get bioField() {
    return cy.getByDataQa('bioField');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get updateSettingsButton() {
    return cy.getByDataQa('UpdateSettings');
  }

  get allertMessage() {
    return cy.get('.swal-modal');
  }

  get okButtonOnAllertMessage() {
    return cy.get('.swal-button');
  }

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get userBio() {
    return cy.getByDataQa('userBio');
  }

  get logOutButton() {
    return cy.getByDataQa('LogOut');
  }

  clickLogOutButton() {
    this.logOutButton.click();
  }

  assertUserHasBio(bio) {
    this.usernameLink.click();
    this.userBio.should('contain', bio);
  }

  assertAllertMessage(message) {
    this.allertMessage.should('contain', message);
    this.okButtonOnAllertMessage.click();
  }

  clickUpdateSettingsButton() {
    cy.wait(400);
    this.updateSettingsButton.click();
  }

  typePassword(password) {
    this.passwordField.clear({ force: true }).type(password);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }
}

export default SettingsPageObject;
