import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  updateUsername (newUsername) {
    cy.findByPlaceholder('Your username').clear().type(newUsername);
  }

  updateBio (bio) {
    cy.findByPlaceholder('Short bio about you').type(bio);
  }

  updateEmail (newEmail) {
    cy.findByPlaceholder('Email').clear().type(newEmail);
  }

  updatePassword (newPassword) {
    cy.findByPlaceholder('Password').clear().type(newPassword);
  }

  clickUpdateBtn() {
    cy.contains('.btn', 'Update Settings')
      .click();
  }

  clickLogOutBtn() {
    cy.contains('.btn', 'Or click here to logout.')
      .click();
  }

  successfulUpdateMessage() {
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }
}
export default SettingsPageObject;
