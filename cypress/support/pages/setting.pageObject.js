import PageObject from '../PageObject';

class SettingPageObject extends PageObject {
 url = '/#/settings';

 get usernameField() {
   return cy.getByDataQa('username-field');
 }

 get bioField() {
   return cy.getByDataQa('bio-field');
 }

 get emailField() {
   return cy.getByDataQa('email-field');
 }

 get passwordField() {
   return cy.getByDataQa('password-field');
 }

 get updateSettingsBtn() {
   return cy.getByDataQa('update-settings-btn');
 }

 get infoBanner() {
   return cy.get('.swal-modal');
 }

 get confirmButton() {
   return cy.get('.swal-button');
 }

 get logoutBtn() {
   return cy.getByDataQa('logout-btn');
 }

 TypeUsernameField(text) {
   this.usernameField.clear().type(text);
 }

 TypeBioField(text) {
   this.bioField.clear().type(text);
 }

 TypeEmailField(text) {
   this.emailField.clear().type(text);
 }

 TypePasswordField(text) {
   this.passwordField.clear().type(text);
 }

 ClickOnUpdateSettingsBtn() {
   this.updateSettingsBtn.click();
 }

 AssertInfoUpdate(text) {
   this.infoBanner.should('contain', text);
 }

 ClickOnConfirmButton() {
   this.confirmButton.click();
 }

 ClickOnLogoutBtn() {
   this.logoutBtn.click();
 }

 }
export default SettingPageObject;
