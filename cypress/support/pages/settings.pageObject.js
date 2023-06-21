import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  usernameSettings(username) {
    cy.getByDataCy('username-settings')
      .clear().type(username);
  }

  bioSettings(bio) {
    cy.getByDataCy('bio-settings')
      .clear().type(bio);
  }

  emailSettings(email) {
    cy.getByDataCy('email-settings')
      .clear().type(email);
  }

  passwordSettings(password) {
    cy.getByDataCy('password-settings')
      .clear().type(password);
  }

  clickOnUpdateBtn() {
    cy.getByDataCy('updateSettingsBtn').click();
  }

  get messageWindow() {
    return cy.get('.swal-title');
  }

  clickOkBtn() {
    cy.get('.swal-button').click();
  }

  clickOnLogOutBtn() {
    cy.getByDataCy('logOutBtn').click();
  }
}

export default SettingsPageObject;
