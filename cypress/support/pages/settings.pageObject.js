class SettingsPageObject {
  visit() {
    cy.visit('#/settings');
  }

  get profilePictureField() {
    return cy.getByDataQa('user-image');
  }

  get userNameField() {
    return cy.getByDataQa('user-username');
  }

  get bioField() {
    return cy.getByDataQa('user-bio');
  }

  get emailField() {
    return cy.getByDataQa('user-email');
  }

  get newPasswordField() {
    return cy.getByDataQa('user-new-password');
  }

  get updateBtn() {
    return cy.getByDataQa('update-button');
  }

  get logOutBtn() {
    return cy.getByDataQa('logout-button');
  }

  get updateTitle() {
    return cy.get('.swal-title');
  }

  get succesfullUpdateBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  typeProfilePicture(profilePicture) {
    this.profilePictureField.clear().type(profilePicture, { force: true });
  }

  typeUserName(username) {
    this.userNameField.clear().type(username, { force: true });
  }

  typeBio(bio) {
    this.bioField.clear().type(bio, { force: true });
  }

  typeEmail(email) {
    this.emailField.clear().type(email, { force: true });
  }

  typePassword(password) {
    this.newPasswordField.clear().type(password, { force: true });
  }

  clickOnUpdateButton() {
    this.updateBtn.click();
  }

  clickOnLogOutButton() {
    this.logOutBtn.click();
  }

  assertSuccecfullUpdate() {
    this.updateTitle.should('contain', 'Update successful!');
  }

  clickOnSuccesfullUpdateBtn() {
    this.succesfullUpdateBtn.click();
  }
}

export default SettingsPageObject;
