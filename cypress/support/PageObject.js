export default class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }
}
