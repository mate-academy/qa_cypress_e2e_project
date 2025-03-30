class SettingsPageObject {
  visit() {
    cy.visit('/settings');
  }

  updateUsername(username) {
    cy.get('[data-qa="username"]').clear().type(username);
    cy.get('[data-qa="update-settings-btn"]').click();
  }

  updateBio(bio) {
    cy.get('[data-qa="bio"]').clear().type(bio);
    cy.get('[data-qa="update-settings-btn"]').click();
  }

  updateEmail(email) {
    cy.get('[data-qa="email"]').clear().type(email);
    cy.get('[data-qa="update-settings-btn"]').click();
  }

  updatePassword(password) {
    cy.get('[data-qa="password"]').clear().type(password);
    cy.get('[data-qa="update-settings-btn"]').click();
  }

  logout() {
    cy.get('[data-qa="logout-btn"]').click();
  }

  assertUsernameUpdated(username) {
    cy.get('[data-qa="username"]').should('have.value', username);
  }

  assertBioUpdated(bio) {
    cy.get('[data-qa="bio"]').should('have.value', bio);
  }

  assertEmailUpdated(email) {
    cy.get('[data-qa="email"]').should('have.value', email);
  }

  assertPasswordUpdated(password) {
    cy.get('[data-qa="password"]').should('have.value', password);
  }

  assertLoggedOut() {
    cy.get('[data-qa="sign-in-btn"]').should('be.visible');
  }
}

export default SettingsPageObject;
