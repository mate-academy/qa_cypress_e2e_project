class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get alertWindow() {
    return cy.get('.swal-modal');
  }

  get url() {
    return cy.url();
  }

  allertMessage(text1, text2 = null) {
    this.alertWindow
      .should('contain.text', text1);
    if (text2 !== null) {
      this.alertWindow.should('contain.text', text2);
    }
    cy.contains('button', 'OK')
      .click();
  }
}

export default PageObject;
