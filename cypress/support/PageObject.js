class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get popupText() {
    return cy.get('.swal-text');
  }

  get popupTitle() {
    return cy.get('.swal-title');
  }

  get popupBtn() {
    return cy.get('.swal-button');
  }

  clickOnPopupBtn() {
    this.popupBtn
      .click();
  }

  assertPopupContainText(text) {
    this.popupText
      .should('contain.text', `${text}`);
  }

  assertPopupContainTitle(text) {
    this.popupTitle
      .should('contain.text', `${text}`);
  }

  assertUrlContainsText(data) {
    const text = data.toLowerCase();
    cy.url().should('include', text);
  }
}

export default PageObject;
