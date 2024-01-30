import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
    url = '/#/settings';

    get imageField() {
        cy.getByDataCy('image-settings');
    }

    get usernameField() {
        return cy.getByDataCy('username-settings');
    }

    get bioField() {
        return cy.getByDataCy('bio-settings');
    }

    get emailField() {
        return cy.getByDataCy('email-settings');
    }

    get passwordField() {
        return cy.getByDataCy('password-settings');
    }

    get updateSettingsBtn() {
        return cy.getByDataCy('update-settings-btn');
    }

    get logoutBtn() {
        return cy.getByDataCy('logout-settings-btn');
    }

    changeImage(value) {
        this.imageField.type(`{selectAll}${value}`)
    }

    changeUsername(value) {
        this.usernameField.type(`{selectAll}${value}`);
    }

    changeBio(value) {
        this.bioField.type(`{selectAll}${value}`);
    }

    changeEmail(value) {
        this.emailField.type(`{selectAll}${value}`);
    }

    changePassword(value) {
        this.passwordField.type(`{selectAll}${value}`);
    }

    clickUpdateBtn() {
        this.updateSettingsBtn.click();
    }

    clickLogoutBtn() {
        this.logoutBtn.click();
    }

    assertNewEmail(value) {
        cy.reload();
        this.emailField.should('have.value', value);
    }
    
}

export default SettingsPageObject;