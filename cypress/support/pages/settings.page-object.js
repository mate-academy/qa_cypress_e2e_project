// for local conduit only
import PageObject from '../PageObject';
class settingsPageObject extends PageObject {
  url = `#/settings`;
  get usernameField() {
    return cy.getByDataCy('username-field-settings');
  }
  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }
  get bioField() {
    return cy.getByDataCy('bio');
  }
  get emailField() {
    return cy.getByDataCy('email-field-settings');
  }
  get passwordField() {
    return cy.getByDataCy('password-field-settings');
  }
  get logoutBtn() {
    return cy.get('.btn-outline-danger');
  }
  clearUsername() {
    this.usernameField.clear();
  }
  typeUsername(username) {
    this.usernameField.type(username);
  }
  clickOnUpdateBtn(){
    this.updateBtn.click();
  }
  checkUsername(username) {
    this.usernameField.should('have.value', username);
  }
  typeBio(bio) {
    this.bioField.type(bio);
  }
  checkBio(bio) {
    this.bioField.should('have.value', bio);
  }
  clearEmail() {
    this.emailField.clear();
  }
  typeEmail(email) {
    this.emailField.type(email);
  }
  checkEmail(email) {
    this.emailField.should('have.value', email);
  }
  reloadAndClearCookies() {
    cy.reload().clearCookies();
  }
  typePassword(password) {
    this.passwordField.type(password);
  }
  clickLoggout(){
    this.logoutBtn.click();
  }
}
export default settingsPageObject;
