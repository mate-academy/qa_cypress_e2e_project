/* eslint-disable */
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get updateUsername() {
    return cy.get(':nth-child(2) > .form-control');
  }

  get updateBio() {
    return cy.get(':nth-child(3) > .form-control');
  }

  get updateEmail() {
    return cy.get(':nth-child(4) > .form-control');
  }

  get updatePassword() {
    return cy.get(':nth-child(5) > .form-control');
  }

  get updateBtn() {
    return cy.get('form > :nth-child(1) > .btn');
  }

  get successfulUpdateBtn() {
    return cy.get('.swal-button');
  }

  get logoutBtn() {
    return cy.get('.btn-outline-danger');
  }

  typeUsername(updateUsername) {
    this.updateUsername
      .type(updateUsername);
  }

  typeBio(updateBio) {
    this.updateBio
      .type(updateBio);
  }

  typeEmail(updateEmail) {
    this.updateEmail
      .type(updateEmail);
  }

  typePassword(updatePassword) {
    this.updatePassword
      .type(updatePassword);
  }

  clickUpdateBtn() {
    this.updateBtn
      .click();
  }

  clickOkBtn() {
    this.successfulUpdateBtn
      .click();
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }
}

export default SettingsPageObject;