import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/#/settings';

    get usernameField() {
        return cy.findByPlaceholder('Your username');
    }

    get bioField() {
        return cy.findByPlaceholder('Short bio about you');
    }


    get emailField() {
        return cy.findByPlaceholder('Email');
    }

    get passwordField() {
        return cy.findByPlaceholder('Password');
    }

    get updateSettingsBtn() {
        return cy.contains('button', 'Update Settings');
    }

    clickUpdateSettingsBtn() {
        this.updateSettingsBtn
          .click();
    }

    get okBtn() {
        return cy.contains('button', 'OK');
    }

    clickOkBtn() {
        this.okBtn
          .click();
    }

    get logoutBtn() {
        return cy.contains('button', 'Or click here to logout.')
    }

    clickLogoutBtn() {
        this.logoutBtn
          .click();
    }

    get settingsLink() {
        return cy.findByTestID('settings-nav');
    }

    get loginLink() {
        return cy.findByTestID('login-nav');
    }

    typeUsername(username) {
        this.usernameField
          .clear()
          .type(username);
    }

    typeBio(bio) {
        this.bioField
          .clear()
          .type(bio);
    }

    typeEmail(email) {
        this.emailField
          .clear()
          .type(email);
    }

    typePassword(password) {
        this.passwordField
          .clear()
          .type(password);
    }
}

export default SettingsPageObject;