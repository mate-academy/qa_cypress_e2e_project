import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get settingsUsernameField() {
    return cy.getByDataQa('settings-username');
  }

  get settingsBioField() {
    return cy.getByDataQa('settings-bio');
  }

  get settingsEmailField() {
    return cy.getByDataQa('settings-email');
  }

  get settingsPasswordField() {
    return cy.getByDataQa('settings-password');
  }

  get settingsUpdateBtn() {
    return cy.getByDataQa('settings-update-btn');
  }

  get settingsLogoutBtn() {
    return cy.getByDataQa('settings-logout-btn');
  }

  assertUpdateUserInfo(elementGetter, updateInfo) {
    elementGetter
      .should('have.value', updateInfo);
  }
}

export default SettingsPageObject;
