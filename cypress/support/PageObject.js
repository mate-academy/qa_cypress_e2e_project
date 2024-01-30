class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get warmMessageText() {
    return cy.get('.swal-modal');
  }

  warmMessageTextContain(text) {
    this.warmMessageText.should('contain.text', text);
  }

  warmMessageClickOk() {
    this.warmMessageText.get('.swal-button-container').click();
  }

  get assertAlertMessageText() {
    return cy.get('[aria-modal="true"]');
  }

  assertAlertTextContain(text) {
    this.assertAlertMessageText.should('contain.text', text);
  }
}

export default PageObject;
