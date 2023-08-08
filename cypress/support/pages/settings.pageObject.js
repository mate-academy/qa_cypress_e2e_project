import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get settingsIconField() {
    return cy.getByDataCy('settings-icon');
  };

  get settingsUsernameField() {
    return cy.getByDataCy('settings-username');
  };

  get settingsBioField() {
    return cy.getByDataCy('settings-bio');
  };

  get settingsEmailField() {
    return cy.getByDataCy('settings-email');
  };

  get settingsPasswordField() {
    return cy.getByDataCy('settings-password');
  };

  get updateSettingsBtn() {
    return cy.getByDataCy('settings-update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-logout-btn');
  }

  typeUpdateUsername(username) {
    this.settingsUsernameField
      .clear()
      .type(username);
  }

  typeUpdateBio(bio) {
    this.settingsBioField
      .clear()
      .type(bio);
  }

  typeUpdateEmail(email) {
    this.settingsEmailField
      .clear()
      .type(email);
  }

  typeUpdatePassword(password) {
    this.settingsPasswordField
      .clear()
      .type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn
      .click();
  }

  successfulUpdateSettingsMessage() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
    cy.contains('button', 'OK').click();
  }

  clickLoguotBtn() {
    this.logoutBtn
      .click();
  }

  assertLogOut() {
    cy.get('a').should('contain', 'Sign in');
    cy.get('a').should('contain', 'Sign up');
  }
};

export default SettingsPageObject;
