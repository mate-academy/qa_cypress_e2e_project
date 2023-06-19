import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles/';

  get articleTitleContainer() {
    return cy.getByDataCy('article-title');
  }

  get articleBodyContainer() {
    return cy.getByDataCy('article-body');
  }

  assertArticleTitle(title) {
    this.articleTitleContainer.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBodyContainer.should('contain', body);
  }
}

export default ArticlePageObject;
