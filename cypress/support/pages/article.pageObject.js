import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles';

  assertArticleData(title, body, username) {
    cy.get('h1')
      .should('contain', title);
    cy.get('p')
      .should('contain', body);
    cy.get('a')
      .should('contain', username);
  }

  assertDeletingArticle() {
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  }

  clickEditBtn() {
    cy.contains('.btn', 'Edit Article')
      .click();
  }

  clickDeleteBtn() {
    cy.contains('.btn', 'Delete Article')
      .click();
  }
};

export default ArticlePageObject;