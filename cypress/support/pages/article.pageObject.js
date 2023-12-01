import PageObject from '../PageObject';

export class ArticlePageObject extends PageObject {
  url = '/article';

  get articlePage() {
    return cy.getByDataQa('article-page');
  }

  get editArticleBtn() {
    return cy.getByDataQa('article-edit-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('article-delete-btn');
  }

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  clickEditBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteBtn() {
    this.deleteArticleBtn.click();
  }

  assertTitle(title) {
    this.articleTitle
      .should('contain', title);
  }

  assertBody(body) {
    this.articleBody
      .should('contain', body);
  }

  assertTitleAbsence(title) {
    this.articleTitle
      .should('not.contain', title);
  }

  assertBodyAbsence(body) {
    this.articleBody
      .should('not.contain', body);
  }
}
