import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';
  get usernameField() {
    return cy.get('input[placeholder="Username"]');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  assertProfilePage(username) {
    return cy.url().should('contain', `/profile/${username}`);
  }

  get submitBtn() {
    return cy.get('.btn.btn-lg.btn-primary.pull-xs-right[type="submit"]');
  }

  submitForm() {
    this.submitBtn.click();
  }

  get bioField() {
    return cy.get('input[placeholder="Short bio about you"]');
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  get passwordField() {
    return cy.get('input[placeholder="New Password"]');
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  get logoutButton() {
    return cy.get('button.btn-outline-danger');
  }

  logout() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
