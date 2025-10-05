import Header from './components/Header';

class PageObject {
  constructor() {
    this.header = new Header();
  }

  visit(path = this.url) {
    cy.visit(path);
  }
}

export default PageObject;
