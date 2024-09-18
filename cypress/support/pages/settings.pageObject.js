import PageObject from "../PageObject";

class SettingsPageObject extends PageObject {
    url = '/#/settings';
  
    get signInLink() {
      return cy.getByDataCy('sign-in-link');
    }
  
    get usernameField() {
      return cy.getByDataCy('username');
    }
  
    get bioField() {
      return cy.getByDataCy('bio');
    }
  
    get emailField() {
      return cy.getByDataCy('email');
    }
  
    get newPasswordField() {
      return cy.getByDataCy('new-password');
    }
  
    get updateBtn() {
      return cy.getByDataCy('update-btn');
    }
  
    get logOutBtn() {
      return cy.getByDataCy('logout-btn');
    }
  
    typeName(name) {
      this.usernameField.clear().type(name);
    }
  
    typeBio(bio) {
      this.bioField.clear().type(bio);
    }
  
    typeEmail(email) {
      this.emailField.clear().type(email);
    }
  
    typePassword(password) {
      this.newPasswordField.clear().type(password);
    }
  
    clickUpdateBtn() {
      this.updateBtn.click();
    }
  
    clickLogOutBtn() {
      this.logOutBtn.click();
    }
  
    verifyUserName(name) {
      this.usernameField.should('have.value', name);
    }
  
    verifyBio(bio) {
      this.bioField.should('have.value', bio);
    }
  
    verifyEmail(email) {
      this.emailField.should('have.value', email);
    }
  
    verifyPassword(password) {
      this.newPasswordField.should('have.value', password);
    }
  
    verifySignInLink() {
      this.signInLink.should('contain', 'Sign in');
    }
  }
  
  export default SettingsPageObject;