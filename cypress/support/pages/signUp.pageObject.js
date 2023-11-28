import PageObject from '../PageObject';

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
    get assertText(){
        return cy.get('.swal-text');
    }

    get signInBtn() {
        return cy.getByDataCy('sign-up-btn');
    }

    typeUsername(username) {
        this.usernameField
            .type(username);
    }

    typeEmail(email) {
        this.emailField
            .type(email);
    }

    typePassword(password) {
        this.passwordField
            .type(password);
    }

    clickSignUpBtn() {
        this.signInBtn
            .click();
    }
    textMessage(text) {
        this.assertText.should('contain', text);
    }
}
export default SignUpPageObject;