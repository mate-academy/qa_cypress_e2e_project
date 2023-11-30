import PageObject from '../PageObject';
/// <reference types='cypress' />

class SettingsObject extends PageObject {
  url = '/#/settings';

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

typePassword(password) {
    this.passwordField.type(password);
  }

clickUpdateBtn() {
  cy.getByDataCy('update-btn')
  .click();
}

clickOkButton() {
  cy.get('.swal-button')
  .click();
}

get usernameField() {
  return cy.getByDataCy('username-update-field');
}

get bioField() {
  return cy.getByDataCy('bio-update-field')
}

get emailField() {
  return cy.getByDataCy('email-update-field')
}

typeUsername(name) {
  this.usernameField
    .clear()
    .type(name);
}

typeBio(bio) {
  this.bioField.type(bio);
}

typeEmail(email) {
  this.emailField
  .clear()
  .type(email);
}

assertUsername(username) {
  this.usernameField
    .should('contain', username);
}
assertEmail(email) {
  this.emailField
    .should('contain', email)
}

assertBio(bio) {
  this.bioField
    .should('contain', bio)
}

get modalTitle() {
  return cy.get('.swal-title');
}
updateSuccessful(text) {
  this.modalTitle
    .should('contain', text);
}




}


export default SettingsObject;
