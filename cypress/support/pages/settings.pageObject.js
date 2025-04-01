import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = 'settings';

  get usernameField() {
    return cy.getByDataCy('username');
  }

  get bioField() {
    return cy.getByDataCy('bio');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get saveSettingsBtn() {
    return cy.getByDataCy('save-settings');
  }

  get logOutBtn() {
    return cy.getByDataCy('log-out');
  }

  get profileLink() {
    return cy.getByDataCy('username-link');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in');
  }

  get getModalText() {
    return cy.get('.swal-title');
  }

  changeUsername(username) {
    this.usernameField.clear().type(username);
  }

  changeBio(bio) {
    this.bioField.clear().type(bio);
  }

  changeEmail(email) {
    this.emailField.clear().type(email);
  }
  
  changePassword(password) {
    this.passwordField.clear().type(password);
  }

  updateInfo() {
    this.saveSettingsBtn.click();
  }

  checkUpdate() {
    this.getModalText.should('contain.text', 'Update successful');
  }

  // checkUserName(username) {
  //   this.profileLink.should('contain.text', username.toLowerCase());
  // }

  checkNoUserName() {
    this.profileLink.should('not.exist')
  }

  checkSingInLink() {
    this.signInLink.should('be.visible');
  }

  // checkBio(bio) {
  //   this.bioField.contains(bio);
  // }

  checkEmail(email) {
    this.emailField.should('have.value', email.toLowerCase());
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }
}

export default SettingsPageObject;