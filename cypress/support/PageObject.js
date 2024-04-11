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

  get successfulWindow() {
    return cy.get('[role="dialog"]');
  }

  assertSuccessfulWindow(message) {
    this.successfulWindow.should('contain', message);
  }

  get okWindowBtn() {
    return cy.get('.swal-button--confirm');
  }

  clickOnOkWindowBtn() {
    this.okWindowBtn.click();
  }
}

export default PageObject;
