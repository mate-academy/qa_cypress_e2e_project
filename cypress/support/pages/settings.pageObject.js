import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/#/settings';

    get usernameField() {
        return cy.getByDataCy('username-settings-field')
    }

    get bioField() {
        return cy.getByDataCy('bio-settings-field')
    }

    get updateSettingsBtn() {
        return cy.getByDataCy('update-settings-btn')
    }

    get emailField() {
        return cy.getByDataCy('email-settings-field')
    }

    get passwordField() {
        return cy.getByDataCy('password-settings-field')
    }

    get LogOutBtn() {
        return cy.getByDataCy('logout-settings-btn')
    }

    typeUsername(updateUsername) {
        this.usernameField
            .type(updateUsername);
    }

    typeBio(updateBio) {
        this.bioFieldField
            .type(updateBio);
    }

    clickOnUpdateSettingsBtn() {
        this.updateSettingsBtn
            .click();
    }

    verifyUsernameUpdate(updateUsername) {
        this.usernameField
            .should('contain', updateUsername);
    }

    verifyBiolUpdate(updateBio) {
        this.bioField
            .should('contain', updateBio);
    }

    typeEmail(updateEmail){
        this.emailField
            .type(updateEmail);
    }

    verifyEmailUpdate(updateEmail) {
        this.emailField
            .should('contain', updateEmail);
    }

    typeNewPassword(updatePassword) {
        this.passwordField
            .type(updatePassword);
    }

    clickOnLogOutBtn() {
        this.LogOutBtn
            .click();
    }


}

export default SettingsPageObject;