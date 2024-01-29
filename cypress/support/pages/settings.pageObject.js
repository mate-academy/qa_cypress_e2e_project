import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
    url = '/#/settings';

    get emailField() {
        return cy.getByDataCy('settings-email');
    }

    get usernameField() {
        return cy.getByDataCy('settings-username');
    }

    get bioField() {
        return cy.getByDataCy('settings-bio');
    }

    get passwordField() {
        return cy.getByDataCy('settings-password');
    }

    get updateSettingsButton() {
        return cy.getByDataCy('update-settings-button');
    }

    get logoutButton() {
        return cy.getByDataCy('settings-logout-button');
    }

    typeEmail(email) {
        this.emailField.type(`{selectAll}${email}`)
    }

    typeUsername(username) {
        this.usernameField.type(`{selectAll}${username}`)
    }

    typePassword(password) {
        this.passwordField.type(`{selectAll}${password}`)
    }

    typeBio(bio) {
        this.bioField.type(`{selectAll}${bio}`)
    }

    clickUpdateSettingsButton() {
        this.updateSettingsButton.click()
    }

    clickLogoutButton() {
        this.logoutButton.click()
    }

    assertBioUpdate(newBio) {
        this.bioField.should('contain.value', newBio)
    }
}

export default SettingsPageObject;