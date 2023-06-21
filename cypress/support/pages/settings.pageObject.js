import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameInput() {
    // return cy.getByDataCy('settings-username-input');
    return cy.getByPlaceholder('Your username');
  }

  get bioTextarea() {
    // return cy.getByDataCy('settings-bio-textarea');
    return cy.getByPlaceholder('Short bio about you');
  }

  get emailInput() {
    // return cy.getByDataCy('settings-email-input');
    return cy.getByPlaceholder('Email');
  }

  get passwordInput() {
    // return cy.getByDataCy('settings-password-input');
    return cy.getByPlaceholder('Password');
  }

  get updateSettingsBtn() {
    // return cy.getByDataCy('update-settings-btn');
    return cy.get('form > :nth-child(1) > .btn');
  }

  get logoutBtn() {
    // return cy.getByDataCy('logout-btn');
    return cy.get('.btn-outline-danger');
  }
}

export default SettingsPageObject;
