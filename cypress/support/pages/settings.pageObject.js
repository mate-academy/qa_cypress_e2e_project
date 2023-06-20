import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameInput() {
    // return cy.getByDataCy('settings-username-input');
    return cy.get(':nth-child(2) > .form-control');
  }

  get bioTextarea() {
    // return cy.getByDataCy('settings-bio-textarea');
    return cy.get(':nth-child(3) > .form-control');
  }

  get emailInput() {
    // return cy.getByDataCy('settings-email-input');
    return cy.get(':nth-child(4) > .form-control');
  }

  get passwordInput() {
    // return cy.getByDataCy('settings-password-input');
    return cy.get(':nth-child(5) > .form-control');
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
