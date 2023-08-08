import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get pictureField() {
    return cy.getByPlaceholder('URL of profile picture');
  }

  get usernameField() {
    return cy.getByPlaceholder('Your username');
  }

  get bioField() {
    return cy.getByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get updateBtn() {
    return cy.get(`button:contains("Update Settings")`);
  }

  get okBtn() {
    return cy.get(`button:contains("OK")`);
  }

  get logOutBtn() {
    return cy.get(`button:contains("Or click here to logout.")`);
  }

  typePicture(picture) {
    this.pictureField
      .type(picture);
  }

  typeUsername(username) {
    this.usernameField.clear()
      .type(username);
  }

  typeBio(bio) {
    this.bioField.clear()
      .type(bio);
  }

  typePassword(password) {
    this.passwordField.clear()
      .type(password);
  }

  typeEmail(email) {
    this.emailField.clear()
      .type(email);
  }

  clickupdateBtn() {
    this.updateBtn
      .click();
  }

  clickOkBtn() {
    this.okBtn
      .click();
  }

  clickLogOutBtn() {
    this.logOutBtn
      .click();
  }

  assertUpdate() {
    cy.get('.swal-title').should('contain', 'Update successful!');
  }

  assertLogOut() {
    cy.get(':nth-child(2) > .nav-link').should('contain', 'Sign in');
  }

  assertLogOut2() {
    cy.get(':nth-child(3) > .nav-link').should('contain', 'Sign up');
  }
}

export default SettingsPageObject;
