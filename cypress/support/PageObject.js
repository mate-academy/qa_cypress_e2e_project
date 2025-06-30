class PageObject {
  get username() {
    return cy.getByDataCy('header-username');
  }

  get modalTitle() {
    return cy.get('.swal-title');
  }

  visit(url) {
    cy.visit(url || this.url);
  }

  checkUsernameValue(username) {
    return this.username.invoke('text').then((text) => {
      expect(text.trim()).to.eq(username);
    });
  }

  checkModalTitle(title) {
    return this.modalTitle.should('have.text', title);
  }
}

export default PageObject;
