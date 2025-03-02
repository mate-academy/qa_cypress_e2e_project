import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
    url = '/user/register';

    get emailField() {
        return cy.getByDataQa('email-sign-up');
    }

    get passwordField() {
        return cy.getByDataQa('password-sign-up');
    }

    get usernameField() {
        return cy.getByDataQa('username-sign-up');
    }

    get signUpBtn() {
        return cy.getByDataQa('btn-sign-up');
    }

    typeEmail(email) {
        this.emailField
            .type(email);
    }

    typePassword(password) {
        this.passwordField
            .type(password);
    }

    typeUsername(username) {
        this.usernameField
            .type(username);
    }

    clickSignUpBtn() {
        this.signUpBtn
            .click();
    }

    assertErrorMessage(message) {
        cy.get('ul.error-messages li:nth-child(2)')
            .should('contain.text', message);
    }
}

export default SignUpPageObject;
