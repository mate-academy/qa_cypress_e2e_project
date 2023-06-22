import PageObject from '../PageObject';

class settingsPageObject extends PageObject {
  url = '#/settings';

  typeUserEmail(email) {
    cy.getByDataCy('email-sign-in')
      .type(email);
  }

  updateUsername(username) {
    cy.getByDataCy('settings-username')
      .clear()
      .type(username);
  }

  updateBio(bio) {
    cy.getByDataCy('settings-bio')
      .type(bio);
  }

  updateEmail(email) {
    cy.getByDataCy('settings-email')
      .clear()
      .type(email);
  }

  updatePassword(password) {
    cy.getByDataCy('settings-password')
      .type(password);
  }

  clickSubmitButton() {
    cy.getByDataCy('settings-submit')
      .click();
  }

  assertUpdate(modalText) {
    cy.get('.swal-modal')
      .should('contain', modalText);
    cy.get('.swal-button')
      .click();
  }

  clickSettingsLink() {
    cy.getByDataCy('settings-link')
      .click();
  }

  clickLogOut() {
    cy.getByDataCy('settings-logout')
      .click();
  };

  assertLogOut() {
    cy.getByDataCy('sign-in-link')
      .should('contain', 'Sign in');
    cy.getByDataCy('sign-up-link')
      .should('contain', 'Sign up');
  }

  assertBio(bio) {
    cy.getByDataCy('settings-bio')
      .should('have.value', bio);
  }

  successfulLoginWithNewEmail(email, password) {
    cy.getByDataCy('settings-logout')
      .click();
    cy.getByDataCy('sign-in-link')
      .click();
    cy.getByDataCy('email-sign-in')
      .type(email);
    cy.getByDataCy('password-sign-in')
      .type(password);
    cy.getByDataCy('sign-in-btn')
      .click();
  }

  successfulLoginWithNewPassword(email, password) {
    cy.getByDataCy('settings-logout')
      .click();
    cy.getByDataCy('sign-in-link')
      .click();
    cy.getByDataCy('email-sign-in')
      .type(email);
    cy.getByDataCy('password-sign-in')
      .type(password);
    cy.getByDataCy('sign-in-btn')
      .click();
  }
}

export default settingsPageObject;