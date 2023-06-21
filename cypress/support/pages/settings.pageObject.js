import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  typeNewUsername(username) {
    cy.getByDataQa('input-username')
      .clear()
      .type(username);
  }

  typeNewBio(bio) {
    cy.getByDataQa('input-bio')
      .clear()
      .type(bio);
  }

  typeNewEmail(email) {
    cy.getByDataQa('input-email')
      .clear()
      .type(email);
  }

  typeNewPassword(password) {
    cy.getByDataQa('input-password')
      .type(password);
  }

  clickUpdateSettings() {
    cy.getByDataQa('update-settings-btn')
      .click();
  }

  verifyNewUsername(username) {
    cy.visit(this.url);
    cy.getByDataQa('input-username')
      .should('have.value', username);
  }

  verifyNewBio(bio) {
    cy.visit(this.url);
    cy.getByDataQa('input-bio')
      .should('have.value', bio);
  }

  verifyNewEmail(email) {
    cy.visit(this.url);
    cy.getByDataQa('input-email')
      .should('have.value', email);
  }

  clickLogOut() {
    cy.visit(this.url);
    cy.getByDataQa('logout-btn')
    .click();
  }

  checkSettingsUpdate() {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', 'Update successful!');
    cy.get('.swal-button')
      .click();
    }
}

export default SettingsPageObject;
