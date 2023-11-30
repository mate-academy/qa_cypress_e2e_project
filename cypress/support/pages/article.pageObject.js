import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visitArticlePage(title) {
    cy.visit(`/#/articles/@${title}`);
  }

  get articleBunner() {
    return cy.getByDataQa('article-banner');
  }

  get editBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get articleBody() {
    return cy.getByDataQa('article-descriptions');
  }

  get deleteBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  clickEditBtn() {
    this.editBtn.first().click();
  }

  clickDeleteBtn() {
    this.deleteBtn.first().click();
  }

  assertArticleCreated(title) {
    this.articleBunner
      .should('contain', title);
  }

  assertArticleNewBody(body) {
    this.articleBody
      .should('contain', body);
  }

  assertCreated() {
    cy.url().should('include', '/#/articles/');
  }
}
export default ArticlePageObject;
