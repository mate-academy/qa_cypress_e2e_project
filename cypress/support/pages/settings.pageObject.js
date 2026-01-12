import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  get usernameInSettings() {
    return cy.getByDataQa('update-username');
  }

  get bioInSettings() {
    return cy.getByDataQa('update-bio');
  }

  get emailInSettings() {
    return cy.getByDataQa('update-email');
  }

  get passwordInSettings() {
    return cy.getByDataQa('update-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('update-settings');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout');
  }

  get swalBtn() {
    return cy.get('.swal-button');
  }

  typeUserName(username) {
    return this.usernameInSettings.clear().type(username);
  }

  typeBio(bio) {
    this.bioInSettings.clear().type(bio);
  }

  typeEmail(email) {
    this.emailInSettings.clear().type(email);
  }

  typePassword(password) {
    this.passwordInSettings.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  clickSwalBtn() {
    this.swalBtn.click();
  }

  assertUpdatedBio(bio) {
    this.bioInSettings.should('contain.value', bio);
  }

  assertUpdatedEmail(email) {
    this.emailInSettings.should('contain.value', email);
  }
}

export default SettingsPageObject;
