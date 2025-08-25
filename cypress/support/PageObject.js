class PageObject {
  url = '/';

  visit(path) {
    cy.visit(path || this.url);
  }

  getByQa(selector, options = {}) {
    return cy.get(`[data-qa="${selector}"]`, options);
  }

  clickByQa(selector, options = {}) {
    this.getByQa(selector, options).click();
  }

  typeByQa(selector, text, options = {}) {
    this.getByQa(selector, options).type(text);
  }

  shouldContainByQa(selector, text, options = {}) {
    this.getByQa(selector, options).should('contain', text);
  }
}

export default PageObject;
