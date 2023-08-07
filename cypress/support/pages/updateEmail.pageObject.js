class UpdateEmailPageObject {
  visit() {
    cy.visit('/#/settings');
  }

  getEmailInput() {
    return cy.findByPlaceholder('URL of profile picture');
  }

  updateEmail(newEmail) {
    this.getEmailInput().clear().type(newEmail);
    cy.contains('button', 'Update Settings').click();
  }
}

export default UpdateEmailPageObject;
