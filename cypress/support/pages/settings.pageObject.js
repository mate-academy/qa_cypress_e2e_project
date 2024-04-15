import PageObject from '../PageObject';
import HomePageObject from './home.pageObject';
import SignInPageObject from './signIn.pageObject';
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
class SettingsPageObject extends PageObject {
  url = '#/settings';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  get usernameField() {
    return cy.getByDataCy('username');
  }

  writeNewUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username);
  }

  get selectBioField() {
    return cy.getByDataCy('bio', { timeout: 5000 });
  }

  get selectEmailField() {
    return cy.getByDataCy('email', { timeout: 5000 });
  }

  get selectOkBtnInModalWindow() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  clickOkBtnInModalWindow() {
    this.selectOkBtnInModalWindow.click();
  }

  writeNewBio(bio) {
    this.selectBioField.clear().type(bio);
  }

  writeNewEmail(email) {
    this.selectEmailField.clear().type(email);
  }

  get selectPasswordField() {
    return cy.getByDataCy('password');
  }

  writeNewPassword(password) {
    this.selectPasswordField.clear().type(password);
  }

  get clickSubmit() {
    return cy.getByDataCy('SubmitBtn').click();
  }

  get clickLogout() {
    return cy.getByDataCy('logoutBtn').click();
  }

  assertProfileContainNewBio(bio) {
    this.selectBioField.invoke('val').should('contain', bio);
  }

  assertProfileContainNewEmail(email) {
    this.selectEmailField.should('have.value', email);
  }
}

export default SettingsPageObject;
