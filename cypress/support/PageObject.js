class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get swalModal() {
    return cy.getByDataCy('swalModal');
  }

  assertPageURL(url) {
    return cy.url().should('include', url);
  }
}

export default PageObject;
