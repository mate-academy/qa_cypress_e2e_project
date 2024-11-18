class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  // register(email, username, password) {
  //   cy.register(user.email, user.username, user.password);
  // }
}

export default PageObject;
