import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get newPasswordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('settings-updateBtn');
  }

  get logoutBtn(){
    return cy.getByDataCy('settings-logoutBtn');
  }

  get modalOkBtn(){
    return cy.get('.swal-button.swal-button--confirm');
  }

  clickModalOkBtn(){
    this.modalOkBtn.click();
  }

  clearUsername(){
    this.usernameField.clear();
  }

  clearBio(){
    this.bioField.clear();
  }

  clearEmail(){
    this.emailField.clear();
  }

  updateUsername(username){
    this.usernameField.type(username);
  }

  updateBio(bio){
    this.bioField.type(bio);
  }

  updateEmail(email){
    this.emailField.type(email);
  }

  updatePassword(password){
    this.newPasswordField.type(password);
  }

  clickUpdateBtn(){
    this.updateSettingsBtn.click();
    this.clickModalOkBtn();
  }

  clickLogoutBtn(){
    this.logoutBtn.click();
  }

  assertUsernameUpdate(username){
    this.usernameField.should('have.value', username);
  }

  assertBioUpdate(bio){
    this.bioField.should('have.value', bio);
  }

  assertEmailUpdate(email){
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;