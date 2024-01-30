import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get urlField() {
    return cy.getByDataCy('url');
  }

  typeUrl(url) {
    this.urlField
      .type(url);
  }
  get usernameField() {
    return cy.getByDataCy('username');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }
  get bioField() {
    return cy.getByDataCy('bio');
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }
  get emailField() {
    return cy.getByDataCy('userEmail');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }
  get passwordField() {
    return cy.getByDataCy('userPassword');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }
  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get alert() {
    return cy.get('.swal-modal')
  }

  assertAlertContainMessage() {
  this.alert.should('contain', 'Update successful!')
  }
  
  
  get updateBtn() {
    return cy.getByDataCy('btn-update');
  }

  clickupdateBtn() {
    this.updateBtn
      .click();
  }
  get btnLogOut() {
    return cy.getByDataCy('btn-logOut');
  }

  clickbtnLogOut() {
    this.btnLogOut
      .click();
  }


  assertContainerContainTitle(title) {
    this.usernameLink
      .should('contain', title);
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn').eq(0);;
  }

  assertNewPassword(password) {
    this.passwordField
      .should('contain', password);
  }
  
}
export default SettingsPageObject;
