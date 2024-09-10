import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get picture() {
    return cy.getByDataCy('setting-picture');
  }

  get email() {
    return cy.getByDataCy('setting-email');
  }

  get username() {
    return cy.getByDataCy('setting-username');
  }

  get bio() {
    return cy.getByDataCy('setting-bio');
  }

  get password() {
    return cy.getByDataCy('setting-password');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get alertMessage() {
    return cy.contains('.swal-title', 'Update successful!');
  }

  get okBtn() {
    return cy.contains('.swal-button', 'OK');
  }

  logout() {
    cy.contains('Or click here to logout.')
      .click();
  }

  checkLogout() {
    cy.contains('.nav-link', 'Sign up')
      .should('exist');

    cy.contains('.nav-link', 'Sign up')
      .should('exist');
  }

  typeUsername(username) {
    this.username.type(username);
  }

  typePicture(picture) {
    this.picture.type(picture);
  }

  typeBio(bio) {
    this.bio.type(bio);
  }

  typeEmail(email) {
    this.email.type(email);
  }

  typePassword(password) {
    this.password.type(password);
  }
}

export default SettingsPageObject;
