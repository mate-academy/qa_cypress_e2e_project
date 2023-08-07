import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  typeUsername(username) {
    cy.getByDataCy('settings-username').type(username);
  }

  typeBio(bio) {
    cy.getByDataCy('settings-bio').type(bio);
  }

  typeEmail(email) {
    cy.getByDataCy('settings-email').type(email);
  }

  typePassword(password) {
    cy.getByDataCy('settings-password').type(password);
  }

  clearUsername() {
    cy.getByDataCy('settings-username').clear();
  }

  clearEmail() {
    cy.getByDataCy('settings-email').clear();
  }

  assertUpdatingUsername(username) {
    cy.getByDataCy('settings-username').should('have.value', username);
  }

  assertUpdatingBio(bio) {
    cy.getByDataCy('settings-bio').should('have.value', bio);
  }

  assertUpdatingEmail(email) {
    cy.getByDataCy('settings-email').should('have.value', email);
  }

  clickUpdateSettingsBtn() {
    cy.getByDataCy('settings-update-btn').click();
  }

  clickLogoutBtn() {
    cy.getByDataCy('settings-logout-btn').click();
  }

  assertWindowUpdatingSettings(message) {
    cy.get('.swal-modal').should('contain', message);
  }

  clickOnOkBtnOnSettingsModal() {
    cy.contains('.swal-button', 'OK').click();
  }
}

export default SettingsPageObject;
