class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  confirmDelete() {
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you really want to delete it?');
      return true;
    });
  }
}

export default PageObject;
