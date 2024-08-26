import PageObject from '../PageObject';

let user;
before(() => {
  cy.task('generateUser').then((generateUser) => {
    user = generateUser;
  });
});

class SetingsPageObject extends PageObject {
  url = 'settings';
  userNameFieldType(username) {
    cy.getByDataCy('username-field').clear().type(username);
  }

  userNameFieldCheck(expectedUsername) {
    cy.getByDataCy('username-field').should('have.value', expectedUsername);
  }

  bioFieldType(newBio) {
    cy.getByDataCy('bio').type(newBio);
  }

  bioFieldCheck(newBio) {
    cy.getByDataCy('bio').should('have.value', newBio);
  }

  emailFieldType(newEmail) {
    cy.getByDataCy('emeil-field').clear().type(newEmail);
  }

  emailFieldCheck(newEmail) {
    cy.getByDataCy('emeil-field').should('have.value', newEmail);
  }

  passwordFieldType(newPassword) {
    cy.getByDataCy('password-field').type(newPassword);
  }

  profileLinkCheck(username) {
    cy.getByDataCy('username-link').should('contain', username);
  }

  checkLogOut() {
    cy.contains('.nav-link', 'Sign in').should('be.visible');
  }

  get btnUpdate() {
    return cy.getByDataCy('btn-update').click();
  }

  get logOutBtn() {
    return cy.getByDataCy('btnDanger').click();
  }
}

export default SetingsPageObject;