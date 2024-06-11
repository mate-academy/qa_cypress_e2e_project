import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  updateUsername(username) {
    cy.getByDataCy('username')
      .clear()
      .type(username);
  }

  updateBio(bio) {
    cy.getByDataCy('bio')
      .clear()
      .type(bio);
  }

  clickSubmitBtn() {
    cy.contains('.btn', 'Update Settings')
      .click();
  }

  assertUpdateSuccessful() {
    cy.get('.swal-title')
      .should('contain', 'Update successful!');
  }

  clickOkBtn() {
    cy.contains('button', 'OK')
      .click();
  }

  assertBio(bio) {
    cy.findByPlaceholder('Short bio about you')
      .should('have.value', bio);
  }

  updateEmail(email) {
    cy.getByDataCy('email')
      .clear()
      .type(email);
  }

  updatePassword(password) {
    cy.getByDataCy('password')
      .type(password);
  }

  clickLogOut() {
    cy.contains('button', 'Or click here to logout.').click();
  }

  assertLogOut() {
    cy.get('a')
      .should('contain', 'Sign in');
    cy.get('a')
      .should('contain', 'Sign up');
  }
}
export default SettingsPageObject;
