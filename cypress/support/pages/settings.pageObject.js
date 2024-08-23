import PageObject from '../PageObject';

let user;
before(() => {
  cy.task('generateUser').then((generateUser) => {
    user = generateUser;
  });
});

class SetingsPageObject extends PageObject {
  // url = '#/settings';

  settingsLinkClick() {
    cy.getByDataCy('settings-link').click();
  }

  userNameFieldType(username) {
    cy.getByDataCy('username-settings').clear().type(username);
  }

  userNameFieldCheck(expectedUsername) {
    cy.getByDataCy('username-settings').should('have.value', expectedUsername);
  }

  bioFieldType(newBio) {
    cy.getByDataCy('bio-settings').type(newBio);
  }

  bioFieldCheck(newBio) {
    cy.getByDataCy('bio-settings').should('have.value', newBio);
  }

  emailFieldType(newEmail) {
    cy.getByDataCy('email-settings').clear().type(newEmail);
  }

  emailFieldCheck(newEmail) {
    cy.getByDataCy('email-settings').should('have.value', newEmail);
  }

  passwordFieldType(newPassword) {
    cy.getByDataCy('password-settings').type(newPassword);
  }

  profileLinkCheck(username) {
    cy.getByDataCy('username-link').should('contain', username);
  }

  checkLogOut() {
    cy.contains('.nav-link', 'Sign in').should('be.visible');
  }

  get btnUpdate() {
    return cy.getByDataCy('update-button-settings').click();
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-button-settings').click();
  }
}

export default SetingsPageObject;
