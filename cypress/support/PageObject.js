class PageObject {
  url;

  visit(url) {
    cy.visit(url || this.url);
  }
}

export default PageObject;
