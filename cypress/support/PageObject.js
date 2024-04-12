class PageObject {
  get swalTitle() {
    return cy.get('.swal-title');
  };

  get swalText() {
    return cy.get('.swal-text');
  };

  visit(url) {
    cy.visit(url || this.url);
  };

  assertSwalTitle(text) {
    this.swalTitle.should('contain.text', text);
  };

  assertSwalText(text) {
    this.swalText.should('contain.text', text);
  }
}

export default PageObject;
