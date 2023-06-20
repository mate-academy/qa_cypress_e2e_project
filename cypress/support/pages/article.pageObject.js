import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles/';

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody.should('contain', body);
  }

  visitArticlePage(slug) {
    cy.visit(`#/articles/${slug}`);
  }
}

export default ArticlePageObject;
