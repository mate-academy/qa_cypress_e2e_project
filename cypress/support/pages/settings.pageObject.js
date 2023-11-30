import PageObject from "../PageObject";

class SettingsPageObjet extends PageObject {
    url = '/#/settings'

    get usernameField() {
        return cy.getByDataCy('profile-username');
    }

    get bioField() {
        return cy.getByDataCy('profile-bio');
    }

    get emailField() {
        return cy.getByDataCy('profile-email');
    }

    get passwordField() {
        return cy.getByDataCy('profile-password');
    }
    get UpdateBtn() {
        return cy.getByDataCy('update-btn');
    }

    get logoutBtn() {
        return cy.getByDataCy('logout-btn');
    }

    get successfulAssert() {
        return cy.get('.swal-title');
    }

    get okBtn() {
        return cy.get('.swal-button');
    }

    fillUsernameField(username) {
        this.usernameField.type(username);
    }

    fillBioField(bio) {
        this.bioField.type(bio);
    }

    fillEmailField(email) {
        this.emailField.type(email);
    }

    fillPasswordField(password) {
        this.passwordField.type(password);
    }
    clickUpdateBtn() {
        this.UpdateBtn.click();
    }

    clickLogoutBtn() {
        this.logoutBtn.click();
    }

    successfulMessage() {
        this.successfulAssert.should('contain', 'Update successful!');
    }

    clickOkBtn() {
        this.okBtn.click();
    }
}
export default SettingsPageObjet