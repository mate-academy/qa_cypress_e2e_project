class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  assertErrorMassage(string) {
    cy.get('.swal-text').should('contain', string);
  }

  assertErrorMassageTitle(string) {
    cy.get('.swal-title').should('contain', string);
  }
}

export default PageObject;
