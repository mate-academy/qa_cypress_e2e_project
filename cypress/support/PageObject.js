class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  /*getElement(selector) {
    // return cy.get(selector);
    return cy.get(selector, { timeout: 10000 }).should('exist');
  }

  typeText(selector, text) {
    this.getElement(selector).type(text);
  }

  clickElement(selector) {
    this.getElement(selector).click();
  }*/
}

export default PageObject;
