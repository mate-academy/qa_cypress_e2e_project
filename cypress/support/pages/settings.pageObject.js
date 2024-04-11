import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  get username() {
    return cy.getByDataQa('settings-username');
  }

  get bio() {
    return cy.getByDataQa('settings-bio');
  }

  get email() {
    return cy.getByDataQa('settings-email');
  }

  get password() {
    return cy.getByDataQa('settings-password');
  }

  typeUsername(username) {
    return this.username.type(`{selectall}${username}`);
  }

  typeBio(bio) {
    return this.bio.type(`{selectall}${bio}`);
  }

  typeEmail(email) {
    return this.email.type(`{selectall}${email}`);
  }

  typePassword(password) {
    return this.password.type(`{selectall}${password}`);
  }

  get clickOnUpdateButton() {
    return cy.getByDataQa('settings-update-button').click();
  }

  get confirmDialogWindow() {
    return cy.get('[class="swal-button swal-button--confirm"]').click();
  }

  get clickOnLogoutButton() {
    return cy.getByDataQa('settings-logout-button').click();
  }
}

export default SettingsPageObject;
