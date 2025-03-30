import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles';

  visitArticlePage(slug) {
    cy.visit(`#/articles/${slug}`);
  }

  get articleTitle() {
    return cy.getByDataQa('article-page-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-page-body');
  }

  get articleEditBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get articleDeleteBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  assertNewArticleTitle(text) {
    this.articleTitle.should('contain', text);
  }

  assertNewArticleBody(text) {
    this.articleBody.should('contain', text);
  }
};

export default ArticlePageObject;
