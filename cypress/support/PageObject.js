class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get modalMessage() {
    return cy.get('[role="dialog"]');
  }

  assertModalMessageContains(message) {
    this.modalMessage.should('contain', message);
  }

  assertSuccessfulModalMessage() {
    this.modalMessage.should('contain', 'Update successful!');
  }

  closeModalMessage() {
    cy.contains('button', 'OK').click()
  }

  openMainPage() {
    cy.visit('/#/')
  }
}

export default PageObject;
