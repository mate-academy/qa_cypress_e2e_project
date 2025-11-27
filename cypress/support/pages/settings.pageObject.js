class SettingsPage {
  visit() {
    cy.visit('/settings');
  }

  usernameInput = () => cy.get('[data-cy=settings-username]');
  bioInput = () => cy.get('[data-cy=settings-bio]');
  emailInput = () => cy.get('[data-cy=settings-email]');
  passwordInput = () => cy.get('[data-cy=settings-password]');
  submitBtn = () => cy.get('[data-cy=settings-submit]');
  logoutBtn = () => cy.get('[data-cy=settings-logout]');

  updateUsername(username) {
    this.usernameInput().clear().type(username);
    this.submitBtn().click();
  }

  updateBio(bio, password = null) {
    this.bioInput().clear().type(bio);

    if (password) {
      this.passwordInput().clear().type(password);
    }

    this.submitBtn().click();
  }

  updateEmail(email) {
    this.emailInput().clear().type(email);
    this.submitBtn().click();
  }

  updatePassword(password) {
    this.passwordInput().clear().type(password);
    this.submitBtn().click();
  }

  logout() {
    this.logoutBtn().click();
  }
}

export default SettingsPage;
