class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  assertConduitBanner() {
    cy.get('h1').should('contain', 'conduit');
  }
}

export default PageObject;
