import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles/:articleTitile';

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleAuthor() {
    return cy.getByDataCy('article-authorName');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get articleEditLink() {
    return cy.getByDataCy('article-edit');
  }

  get articleDeleteBtn() {
    return cy.getByDataCy('article-delete');
  }

  clickArticleAuthor() {
    this.articleAuthor.eq(0)
      .click();
  }

  clickArticleEditLink() {
    this.articleEditLink.eq(0)
      .click();
  }

  clickArticleDeleteBtn() {
    this.articleDeleteBtn.eq(0)
      .click();
  }

  assertH1ContainArticleTitle(title) {
    return this.articleTitle
      .should('contain', title);
  }

  assertAuthorNameContainUsername(username) {
    return this.articleAuthor
      .should('contain', username);
  }

  assertArticleBodyContainBody(body) {
    return this.articleBody
      .should('contain', body);
  }
}

export default ArticlePageObject;
