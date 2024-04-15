class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }


  assertUrlInclude(url) {
    cy.url().should('include', url);
  }
  assertUrlNotInclude(url) {
    cy.url().should('not.include', url);
  }
}
export default PageObject;
