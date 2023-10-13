import PageObject from '../PageObject';

class signUpPageObject extends PageObject {
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
        return cy.getByDataCy('sign-up-button');
      }

      get signInLink() {
        return cy.getByDataCy('sign-in-link');
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
        this.signUpBtn
          .click();
      }

      goToSignIn() {
        this.signInLink
          .click();
      }
}

export default signUpPageObject;