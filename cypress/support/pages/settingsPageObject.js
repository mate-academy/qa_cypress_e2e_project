import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('user-name-settings');
  }

  typeInUsernameField(typeName) {
    this.usernameField.clear().type(typeName);
  }

  get bioField() {
    return cy.getByDataCy('user-short-bio');
  }

  typeInBioField(typeBio) {
    this.bioField.clear().type(typeBio);
  }

  userBioTextUpdated(containBio) {
    this.bioField.should('contain.value', containBio);
  }

  get emailField() {
    return cy.getByDataCy('user-email');
  }

  typeInEmailField(typeEmail) {
    this.emailField.clear().type(typeEmail);
  }

  get passwordField() {
    return cy.getByDataCy('user-newpassword');
  }

  typeInPasswordField(typePassword) {
    this.passwordField.type(typePassword);
  }

  get updateBtn() {
    return cy.getByDataCy('update-button');
  }

  clickOnUpdateBtn(upBtn) {
    this.updateBtn.click();
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickOnEditBtn(editBtn) {
    return cy.getByDataCy('edit-btn').click(editBtn);
  }

  emailFieldIsUpdate(updateEmail) {
    this.emailField.should('contain.value', updateEmail);
  }

  passwordFieldIsUpdate(updatePassw) {
    this.passwordField.should('contain.value', updatePassw);
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickOnLogOutbtn(logout) {
    this.logOutBtn.click();
  }

  get navBar() {
    return cy.getByDataCy('nav-bar');
  }

  navbarShouldNotContain(notContain) {
    this.navBar.should('not.contain', notContain);
  }
}

export default SettingsPageObject;
