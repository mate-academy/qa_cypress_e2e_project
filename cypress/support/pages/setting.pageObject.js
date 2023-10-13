import PageObject from "../PageObject";

class settingPageObject extends PageObject {
    url = '/#/settings';

    get settingsLink() {
        return cy.getByDataCy('settings-link');
    }

    get usernameField() {
        return cy.getByDataCy('username-field-settings');
    }

    get bioField() {
        return cy.getByDataCy('bio-field-settings');
    }

    get emailField() {
        return cy.getByDataCy('email-field-settings');
    }

    get passwordField() {
        return cy.getByDataCy('password-field-settings');
    }

    get updateSettings() {
        return cy.getByDataCy('update-settings-btn');
    }

    get logoutButton() {
        return cy.getByDataCy('logout-btn');
    }

    clickSettingsLink() {
        this.settingsLink
          .click();
    }

    updateUsername(username) {
        this.usernameField.clear()
          .type(username);
    }

    updateBio(bio) {
        this.bioField.clear()
          .type(bio);
    }

    updateEmail(email) {
        this.emailField.clear()
          .type(email);
    }

    updatePassword(password) {
        this.passwordField.clear()
          .type(password);
    }

    clickUpdateSettings() {
        this.updateSettings
          .click();
    }

    clickLogoutButton() {
        this.logoutButton
          .click();
    }

    assertEmailChanged(email) {
        this.emailField
          .should('contain', 'newEmail@mail.com');
    }
}

export default settingPageObject;