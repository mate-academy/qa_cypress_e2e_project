import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.findByPlaceholder('Your username');
  }

  get bioField() {
    return cy.findByPlaceholder(`Short bio about you`);
  }

  get emailField() {
    return cy.findByPlaceholder(`Email`);
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get updSetBtn() {
    return cy.contains('.btn', 'Update Settings');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeBio(bio) {
    this.bioField
      .type(String(bio));
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickUpdSetBtn() {
    this.updSetBtn
      .click();
  }

  clearUserInfo(placeholder) {
    cy.findByPlaceholder(placeholder).clear();
  }

  assertSuccessfulUpdate() {
    cy.contains('.swal-title', 'Update successful!').should('exist');
    cy.contains('.swal-button', 'OK').click();
  }

  clickLogoutBtn() {
    cy.contains('.btn', 'Or click here to logout.').click();
  }

  assertLogOut() {
    cy.get('a').should('contain', 'Sign in');
    cy.get('a').should('contain', 'Sign up');
  }
}

export default SettingsPageObject;
