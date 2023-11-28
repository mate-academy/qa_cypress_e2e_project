import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get usernameField() {
    return cy.getByDataCy('username-update-field');
  }  
    
  get emailField() {
    return cy.getByDataCy('email-update-field');  
  }
    
  get bioField() {
    return cy.getByDataCy('bio-update-field');  
  }  

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }  

 
  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  fillUsernameField(username) {
    this.usernameField.clear()
    .type(username);
  }
    
  fillEmailField(email) {
    this.emailField.clear()
    .type(email);
  }
 
  fillBioField(bio) {
    this.bioField.clear()
    .type(bio);
  }
    
  assertUpdatedBio(bio) {
    this.bioField.should('contain', bio);
  }

  assertContainNewUsername(username) {
    this.userNameField
      .should('have.value', username);
  }

   assertEmailField(email) {
    this.emailField
      .should('have.value', email);
   }
  
  clickUpdateBtn(){
    this.updateBtn.click();
  }

   clickLogoutBtn(){
    this.logoutBtn.click();
  }
 
}

export default SettingsPageObject;
