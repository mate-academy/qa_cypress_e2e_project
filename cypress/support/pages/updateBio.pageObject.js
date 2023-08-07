class UpdateBioPageObject {
  visit() {
    cy.visit('/#/settings');
  }

  getBioInput() {
    return cy.findByPlaceholder('Short bio about you');
  }

  updateBio(newBio) {
    this.getBioInput().clear().type(newBio);
    cy.contains('button', 'Update Settings').click();
  }
}

export default UpdateBioPageObject;
