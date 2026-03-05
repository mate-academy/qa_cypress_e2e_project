import PageObject from './PageObject.js';

class SettingsPage extends PageObject {
  getPage() {
    return cy.get('[data-qa="settings-page"]');
  }

  getHeading() {
    return cy.get('[data-qa="settings-heading"]');
  }

  getProfilePictureInput() {
    return cy.get('[data-qa="profile-picture-input"]');
  }

  getUsernameInput() {
    return cy.get('[data-qa="username-input"]');
  }

  getBioTextarea() {
    return cy.get('[data-qa="bio-textarea"]');
  }

  getEmailInput() {
    return cy.get('[data-qa="email-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-qa="password-input"]');
  }

  getUpdateSettingsButton() {
    return cy.get('[data-qa="update-settings-button"]');
  }

  getLogoutButton() {
    return cy.get('[data-qa="logout-button"]');
  }

  fillSettingsForm(userData) {
    if (userData.image !== undefined) {
      this.getProfilePictureInput().clear().type(userData.image);
    }
    if (userData.username !== undefined) {
      this.getUsernameInput().clear().type(userData.username);
    }
    if (userData.bio !== undefined) {
      this.getBioTextarea().clear().type(userData.bio);
    }
    if (userData.email !== undefined) {
      this.getEmailInput().clear().type(userData.email);
    }
    if (userData.password !== undefined) {
      this.getPasswordInput().clear().type(userData.password);
    }
  }

  submitSettingsForm() {
    this.getUpdateSettingsButton().click();
  }

  visit() {
    cy.visit('/#/settings');
    this.getPage().should('be.visible');
  }
}

export default new SettingsPage();
