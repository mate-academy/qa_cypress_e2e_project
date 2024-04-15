class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get userNameLink() {
    return cy.getByDataQa('username-link');
  }

  assertHeaderContainUsername(username) {
    this.userNameLink.should('contain', username);
  }

  assertHeaderContainSignIn(link) {
    cy.getByDataQa('sign-in-link').should('contain', link);
  }
}

export default PageObject;
