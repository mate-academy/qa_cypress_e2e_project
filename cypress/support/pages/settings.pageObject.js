import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get emailField() {
    return  cy.getByDataCy('settingsEmail')
  }

  typeUsername(username) {
    cy.getByDataCy('settingsUsername')
      .clear()
      .type(username);
  }

  typeBio(bio) {
    cy.getByDataCy('settingsBio')
      .clear()
      .type(bio);
  }

  typeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  typePassword(password) {
    cy.getByDataCy('settingsPassword')
      .clear()
      .type(password);
  }

  clickOnUpdate() {
    cy.getByDataCy('settingsUpdateBtn')
      .click();
  }

  clickOnLogOut() {
    cy.getByDataCy('settingsLogOutBtn')
      .click();
  }

  get allertWindow(){
    return cy.get('.swal-title')   
  }

  closeModalWindow() {
    cy.get('.swal-button')
      .click();
  }
}

export default SettingsPageObject;
