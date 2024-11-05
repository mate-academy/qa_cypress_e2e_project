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
    
      get signUpBtn() {
        return cy.getByDataCy('sign-up-btn');
      }

      get signUpUrl() {
        return cy.url();
      }
    
      typeUsername(email) {
        this.usernameField
          .type(email);
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
        this.signUpBtn
          .click();
      }

      verifySignUpUrl() {
        this.signUpUrl
          .should('equal', url);
      }

}

export default SignUpPageObject;