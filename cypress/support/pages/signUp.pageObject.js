import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
    url = '/#/register';

    get usernameField() {
        return cy.getByDataCy('username-sign-up');
    }

    get emailField() {
        return cy.getByDataCy('email-sign-up');
    }

    get passwordField() {
        return cy.getByDataCy('password-sign-up');
    }

    get signUpBtn() {
        return cy.getByDataCy('sign-up-btn');
    }

    typeUsername(value) {
        this.usernameField.type(value);
    }

    typeEmail(value) {
        this.emailField.type(value);
    }

    typePassword(value) {
        this.passwordField.type(value);
    }

    clickSignUpBtn() {
        this.signUpBtn.click();
    }
}

export default SignUpPageObject;