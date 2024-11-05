import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
    url = '/settings';

    get usernameField() {
        return cy.getByDataQa('username-set');
    }

    typeUsernameField(username) {
        this.usernameField.clear().type(username);
    }

    get bioField() {
        return cy.getByDataQa('bio-set');
    }

    typeBioField(bio) {
        this.bioField.clear().type(bio);
    }

    get emailField() {
        return cy.getByDataQa('email-set');
    }

    typeEmailField(email) {
        this.emailField.clear().type(email);
    }

    get passField() {
        return cy.getByDataQa('pass-set');
    }

    typePassField(pass) {
        this.passField.clear().type(pass);
    }

    updateSettings() {
        cy.getByDataQa('updateBtn-set').click();
    }

    logoutFromSettings() {
        cy.getByDataQa('logoutBtn-set').click();
    }
}

export default SettingsPageObject;
