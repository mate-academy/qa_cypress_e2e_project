class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  assertUrl(partOfPath) {
    cy.url().should('include', partOfPath);
  }

  assertContainText(element, text) {
    element.should('contain.text', text);
  }

  assertHaveText(element, text) {
    element.should('have.text', text);
  }
}

export default PageObject;
