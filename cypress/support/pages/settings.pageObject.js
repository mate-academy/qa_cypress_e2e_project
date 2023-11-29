import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
  url = "/#/settings";

  get editUsername() {
    return cy.getByDataQa("edit-username");
  }

  get editEmail() {
    return cy.getByDataQa("edit-email");
  }

  get editPassword() {
    return cy.getByDataQa("edit-password");
  }

  get editBio() {
    return cy.getByDataQa("bio");
  }

  get updateBtn() {
    return cy.getByDataQa("update-btn");
  }

  get logoutBtn() {
    return cy.getByDataQa("logout-btn");
  }

  typeEditUsername(username) {
    this.editUsername.type(username);
  }

  typeEditEmail(email) {
    this.editEmail.type(email);
  }

  typeEditPassword(password) {
    this.editPassword.type(password);
  }

  clickuUdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
