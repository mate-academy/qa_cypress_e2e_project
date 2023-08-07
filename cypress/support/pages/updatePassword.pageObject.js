class UpdatePasswordPageObject {
  visit() {
    cy.visit('/#/settings');
  }

  getNewPasswordInput() {
    return cy.findByPlaceholder('Password');
  }

  updatePassword(newPassword) {
    this.getNewPasswordInput().clear().type(newPassword);
    cy.contains('button', 'Password').click();
  }
}

export default UpdatePasswordPageObject;
