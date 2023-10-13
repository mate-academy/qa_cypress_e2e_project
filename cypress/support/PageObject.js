class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  async assertUrl(pageUrl) {
    await cy.url().should('contain', pageUrl);
  }

  fillIn(fieldName, text) {
    cy.getByDataQa(fieldName)
      .type(text);
  };

  assertData(element, data) {
    cy.getByDataQa(element)
      .should('contain', data);
  }

  clickOnButton(element) {
    cy.getByDataQa(element)
      .first()
      .click();
  }

  clickOnLink(element) {
    cy.getByDataQa(element)
      .click();
  }

  assertPopupStatus(element) {
    cy.get(element)
      .should('exist');
  };

  assertPopupMessage(element, data) {
    cy.get(element)
      .should('contain', data);
  };

  closePopUp(element) {
    cy.get(element)
      .click();
  }

  registerUser(username, email, password) {
    cy.register(username, email, password);
  };

  loginUser(username, email, password) {
    cy.login(username, email, password);
  }

  createArticle(title, description, body) {
    cy.createArticle(title, description, body);
  }

  clearData(fieldName) {
    cy.getByDataQa(fieldName)
      .clear();
  };

  openPage(url, data = '') {
    cy.visit(`${url}${data}`);
  }
}

export default PageObject;
