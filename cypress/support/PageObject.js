class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get swalTitle() {
    return cy.get('.swal-title');
  }

  get swalText() {
    return cy.get('.swal-text');
  }

  get swalButton() {
    return cy.get('.swal-button');
  }

  assertSwalContainValidTitle(title) {
    this.swalTitle.should('contain', title);
  }

  assertSwalContainValid(text) {
    this.swalText.should('contain', text);
  }

  clickSwalBtn() {
    this.swalButton
      .click();
  }
}

export default PageObject;
