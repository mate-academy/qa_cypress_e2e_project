import PageObject from '../PageObject';

class SettingsUserAccount extends PageObject {
  url = '/#/settings';
  fillUsernameField(username) {
    cy.getByDataQa('settings-username')
      .clear().type(username);
  }

  fillBlankUsernameField() {
    cy.getByDataQa('settings-username')
      .clear();
  }

  assertUpdateSuccessfulWindow() {
    cy.contains('.swal-title', 'Update successful!').should('be.visible');
  }

  assertNewUsername(username) {
    cy.getByDataCy('username-link').should('contain', username);
  }

  clickOkBtn() {
    cy.get('.swal-button ').click();
  }

  fillEmailField(email) {
    cy.getByDataQa('settings-email')
      .clear().type(email);
  }

  fillBlankEmailField() {
    cy.getByDataQa('settings-email')
      .clear();
  }

  assertNewEmail(newemail) {
    cy.getByDataQa('settings-email').should('have.value', newemail);
  }

  fillUserBioField(bio) {
    cy.getByDataQa('settings-bio').clear().type(bio);
  }

  assertNewBio(bio) {
    cy.getByDataQa('settings-bio').should('have.value', bio);
  }

  fillPasswordField(password) {
    cy.getByDataQa('settings-password-new').clear().type(password);
  }

  clickOnUpdateSettingsBtn() {
    cy.getByDataQa('update-settings-btn').click();
  }

  clickOnLogOutBtn() {
    cy.getByDataQa('update-settings-btn').click();
  }

  assertLogOutUser(newusername) {
    cy.getByDataQa('profile-link').should('not.exist', newusername);
  }

  assertUpdateFailed() {
    cy.get('.swal-text')
      .should('contain', 'Password must be 8 characters long');
  }

  checkPasswordAsterisks() {
    cy.getByDataQa('settings-password-new').matchImageSnapshot();
  }

  assertBlankUserName() {
    cy.get('.swal-text')
      .should('contain', 'Username field required.');
  }

  assertBlankEmail() {
    cy.get('.swal-text')
      .should('contain', 'Email field required.');
  }
}

export default SettingsUserAccount;
