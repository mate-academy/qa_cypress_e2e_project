import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/#/settings';

  updateBio(bio) {
    cy.getByDataCy('bio').type(`{selectAll}${bio}`);
  }

  updateUsername(username) {
    cy.getByDataCy('username').type(`{selectAll}${username}`);
  }

  updateEmail(email) {
    cy.getByDataCy('email').type(`{selectAll}${email}`);
  }

  updatePassword(password) {
    cy.getByDataCy('password').type(`{selectAll}${password}`);
  }

  submit() {
    cy.getByDataCy('update-btn').click();
  }

  logout() {
    cy.getByDataCy('logout-btn').click();
  }

  assertEmail(value) {
    cy.getByDataCy('email').should('contain.value', value);
  }
}

export default SettingsPage;
