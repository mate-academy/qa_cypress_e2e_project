import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {

    url = '/#/settings';

    get usernameField() {
        return cy.getByDataCy('username-field');
    }

    clearUsername() {
        this.usernameField.clear();
    }

    typeUsername(newUsername) {
        this.usernameField.type(newUsername);
    }

    get updateButton() {
        return cy.getByDataCy('update-button');
    }

    clickUpdateButton() {
        this.updateButton.click();
    }

    get updateModalWindow() {
        return cy.get('.swal-modal');
    }

    assertUpdateModalWindow() {
        this.updateModalWindow.should('contain', 'Update successful!')
    }
    
    get bioField() {
        return cy.getByDataCy('bio-field')
    }

    clearBioField() {
        this.bioField.clear();
    }

    typeBioField(newBio) {
        this.bioField.type(newBio);
    }

    assertBioFieldContain(newBio) {
        this.bioField.should('have.value', newBio);
    }

    assertUsernameFieldContain(newUsername) {
        this.usernameField.should('have.value', newUsername);
    }

    get emailField() {
        return cy.getByDataCy('email-field');
    }

    clearEmailField() {
        this.emailField.clear();
    }

    typeEmailField(newEmail) {
        this.emailField.type(newEmail);
    }

    assertEmaiFieldContain(newEmail) {
        this.emailField.should('have.value', newEmail);
    }

    get passwordField() {
        return cy.getByDataCy('password-field');
    }

    typePaswordField(newPassword) {
        this.passwordField.type(newPassword);
    }

    get logoutButton() {
        return cy.getByDataCy('logout-button');
    }

    clickLogoutButton() {
        this. logoutButton.click();
    }

    get okButton() {
        return cy.get('.swal-button');
    }

    clickOkButton() {
        this.okButton.click();
    }

}
export default SettingsPageObject;