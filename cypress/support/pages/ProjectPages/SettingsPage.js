class SettingsPage {
  ChangeUsernameField(edit) {
    cy.getByDataCy('change-username-field').clear();
    cy.getByDataCy('change-username-field').type(edit.username);
  }

  ChangeBioField(edit) {
    cy.getByDataCy('change-bio-field').clear();
    cy.getByDataCy('change-bio-field').type(edit.bio);
  }

  ChangeemailField(edit) {
    cy.getByDataCy('change-email-field').clear();
    cy.getByDataCy('change-email-field').type(edit.email);
  }

  ChangePasswordField(edit) {
    cy.getByDataCy('change-password-field').clear();
    cy.getByDataCy('change-password-field').type(edit.password);
  }

  ClickUpdateSettings() {
    cy.getByDataCy('click-update-btn').click();
  }

  ClickLogOutBtn() {
    cy.getByDataCy('click-logout-btn').click();
  }

  AssertChanges() {
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }
}

export const settingsPage = new SettingsPage();
