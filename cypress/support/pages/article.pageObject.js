import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';
  get titleField() {
    return cy.getByDataCy('create-article-title-field');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  get descriptionField() {
    return cy.getByDataCy('create-article-description-field');
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  get bodyField() {
    return cy.getByDataCy('create-article-body-field');
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.eq(0).click();
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.eq(0).click();
  }

  assertDeleteArticle() {
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  }

  assertCreateArticle(article) {
    cy.get('.banner h1').should('contain', article.title);
  }

  assertEditArticle(article2) {
    cy.get('.article-page').should('contain', article2.title);
  }
}

export default ArticlePageObject;
