import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
	url = '/#/settings';

  get logoutBtn() {
    return cy.getByDataCy('profile-logout-btn');
  }
  
  get editUsernameInput() {
    return cy.getByDataCy('edit-username');
  }

  get editBioInput() {
    return cy.getByDataCy('edit-bio');
  }

  get editEmailInput() {
    return cy.getByDataCy('edit-email');
  }

  get editPasswordInput() {
    return cy.getByDataCy('edit-password');
  }

  get updateBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  assertEditing(modalText) {
    cy.get('.swal-modal').should('contain', modalText);
  }
}

export default SettingsPageObject;
