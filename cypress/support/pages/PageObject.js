export class PageObject {
  visit(path) {
    cy.visit(path);
  }

  getByQa(selector) {
    return cy.get(`[data-qa="${selector}"]`);
  }
}
