import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title-field');
  }

  get articleDescriptionField() {
    return cy.getByDataQa('article-about-field');
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body-field');
  }

  get articleTagsField() {
    return cy.getByDataQa('article-tags-field');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  get articleTitleBanner() {
    return cy.getByDataQa('article-title-banner');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  get articleBodyText() {
    return cy.getByDataQa('article-body-text');
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .clear().type(title);
  }

  typeArticleDescription(description) {
    this.articleDescriptionField.clear().type(description);
  }

  typeArticleBody(body) {
    this.articleBodyField.clear().type(body);
  }

  typeArticleTags(tag) {
    if (tag !== undefined) {
      this.articleTagsField.first().type(tag);
    }
  }

  clickOnPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }

  clickOnEditArticle() {
    this.editArticleBtn.first().click();
  }

  clickOnDeleteArticle() {
    this.deleteArticleBtn.first().click();
  }
}

export default ArticlePageObject;
