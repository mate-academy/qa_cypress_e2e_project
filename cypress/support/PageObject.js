class PageObject {
  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  visit(url) {
    cy.visit(url || this.url);
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertModalTitle(title) {
    return cy.get('.swal-title')
      .should('contain', title);
  }

  closeModal() {
    return cy.get('.swal-button').click();
  }
}

export default PageObject;
