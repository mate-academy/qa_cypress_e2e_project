import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get newArticleLink() {
    return cy.getByDataCy('new-article-btn');
  }

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get submitButton() {
    return cy.getByDataCy('publish-btn');
  }

  get container() {
    return cy.get('.container');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-btn');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-btn');
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  createNewArticle() {
    this.newArticleLink.click();
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  submitArticle() {
    this.submitButton.click();
  }

  assertArticleCreated(title) {
    this.container
      .should('contain', title)
      .and('contain', 'Delete Article')
      .and('contain', 'Edit Article');
  }

  assertArticleDeleted() {
    this.container
      .should('not.contain', 'Delete Article')
      .and('not.contain', 'Edit Article').and('contain', '/');
  }
}

export default ArticlePageObject;