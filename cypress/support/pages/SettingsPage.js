class SettingsPage {
  visit() {
    cy.visit('/settings');
    return this;
  }

  fillBio(bio) {
    cy.get('[data-qa=bio-input]').clear().type(bio);
    return this;
  }

  submit() {
    cy.get('[data-qa=settings-submit]').click();
    return this;
  }
}

export default new SettingsPage();
