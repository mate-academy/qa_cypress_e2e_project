class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  getByQa(selector) {
    return cy.get(`[data-qa="${selector}"]`);
  }

  assertUrlIncludes(path) {
    cy.url().should('include', path);
  }

  assertAlertContains(text) {
    cy.get('.swal-modal').should('contain.text', text);
  }

  confirmAlert() {
    cy.get('.swal-button--confirm')
      .should('be.visible')
      .click();
    cy.get('.swal-overlay')
      .should('not.have.class', 'swal-overlay--show-modal');
  }
}

export default PageObject;
