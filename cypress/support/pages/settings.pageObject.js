// cypress/support/pages/settings.pageObject.js

class SettingsPage {
  get usernameInput() {
    return cy.get('input[placeholder="Your username"]');
  }

  get bioInput() {
    return cy.get('textarea[placeholder="Short bio about you"]');
  }

  get updateSettingsButton() {
    return cy.get('button.btn.btn-lg.btn-primary.pull-xs-right');
  }

  get emailInput() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordInput() {
    return cy.get('input.form-control.form-control-lg[placeholder="Password"]');
  }

  get logOutButton() {
    return cy.get('button.btn.btn-outline-danger');
  }

  submitSettings() {
    return this.updateSettingsButton.click();
  }

  logOutSettings() {
    return this.logOutButton.click();
  }

  login(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
  }
}

export default SettingsPage;
