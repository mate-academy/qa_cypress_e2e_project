import PageObject from '../PageObject';

class ArticlePagePageObject extends PageObject {
  url = `/#/articles`;

  visitArticlePage(slug) {
    cy.visit(`/#/articles/${slug}`);
  }

  containTitle(title) {
    cy.get('h1').should('be.visible', title);
  }

  containBody(body) {
    cy.get('div > p').should('be.visible', body);
  }

  clickEditBtn() {
    cy.contains('.btn', 'Edit Article')
      .click();
  }

  clickDeleteBtn() {
    cy.contains('.btn', 'Delete Article')
      .click();
  }
}

export default ArticlePagePageObject;
