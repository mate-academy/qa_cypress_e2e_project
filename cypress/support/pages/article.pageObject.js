import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQaPlaceholder('Article Title');
  }

  get articleDescriptionField() {
    return cy.getByDataQaPlaceholder(`What's this article about?`);
  }

  get articleBodyField() {
    return cy.getByDataQaPlaceholder('Write your article (in markdown)');
  }

  get articleTagsField() {
    return cy.getByDataQaPlaceholder('Enter tags');
  }

  get publishArticleBtn() {
    return cy.getByDataQaBtn('btn btn-lg pull-xs-right btn-primary');
  }

  get articleTitleBanner() {
    return cy.getByDataQaBtn('banner');
  }

  get editArticleBtn() {
    return cy.getByDataQaBtn('btn btn-sm btn-outline-secondary');
  }

  get deleteArticleBtn() {
    return cy.getByDataQaBtn('btn btn-outline-danger btn-sm');
  }

  get articleBodyText() {
    return cy.getByDataQaBtn('col-xs-12');
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
