import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
    url = '/#/register';

    get userNameField () {
        return cy.getByDataCy('username-field')
    }

    typeUsernameField (username) {
        this.userNameField.type(username);
    }

    get emailField () {
        return cy.getByDataCy('email-field')
    }
    typeEmail(email) {
        this.emailField.type(email);
    }

    get passwordField () {
        return cy.getByDataCy('password-field')
    }
    typePasssword (password) {
        this.passwordField.type(password);
    }

    get signUpBtn() {
        return cy.getByDataCy('sign-up-btn');
    }

    clickSignUpBtn() {
        this.signUpBtn .click();
    }

    get alert() {
        return cy.get('.swal-modal');
    }
    
    assertAlertContainMessage() {
        this.alert.should('contain', 'Your registration was successful!')
    }
    assertAlertContainErrorMessage() {
        this.alert.should('contain', 'Registration failed!');
    }
    assertAlertErrorMessage() {
        this.alert
        .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    }
}

export default SignUpPageObject;