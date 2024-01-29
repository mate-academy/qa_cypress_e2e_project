class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get errorWindow() {
    return cy.get('[role="dialog"]');
  }

  assertErrorWindow(message) {
    this.errorWindow.should('contain', message);
  }

  get successWindow() {
    return cy.get('[role="dialog"]');
  }

  assertSuccessWindow(message) {
    this.successWindow.should('contain', message);
  }

  get okButton() {
    return cy.get('.swal-button--confirm');
  }

  clickOkButton() {
    this.okButton.click();
  }
}

export default PageObject;
