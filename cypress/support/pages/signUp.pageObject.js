import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
    url = '/#/register';

    get emailField() {
        return cy.getByDataCy('sign-up-email');
    }

    get usernameField() {
        return cy.getByDataCy('sign-up-username');
    }

    get passwordField() {
        return cy.getByDataCy('sign-up-password');
    }

    get signUpButton() {
        return cy.getByDataCy('sign-up-button')
    }

    typeEmail(email) {
        this.emailField.type(email)
    }

    typeUsername(username) {
        this.usernameField.type(username)
    }

    typePassword(password) {
        this.passwordField.type(password)
    }

    clickSignUpButton() {
        this.signUpButton.click()
    }
}

export default SignUpPageObject;