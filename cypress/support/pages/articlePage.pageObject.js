import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-description-field');
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }
  
  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get articleDeleteBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  get articleEditBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  typeArticleTitleField(articleTitleField) {
    this.articleTitleField.clear().type(articleTitleField);
  }

  typeArticleDescriptionField(articleDescriptionField) {
    this.articleDescriptionField.clear().type(articleDescriptionField);
  }

  typeArticleBodyField(articleBodyField) {
    this.articleBodyField.clear().type(articleBodyField);
  }

  clickOnEditBtn() {
    cy.getByDataCy('edit-article-btn').first().click();
  }

  clickOnDeleteBtn() {
    cy.getByDataCy('delete-article-btn').first().click();
  }

  clickOnPublishBtn() {
    cy.getByDataCy('publish-article-btn').click();
  }
}

export default ArticlePageObject;

