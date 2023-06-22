import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  typeArticleTitle(title) {
    this.articleTitleField.clear().type(title);
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-description-field');
  }

  typeArticleDescription(description) {
    this.articleDescriptionField.clear().type(description);
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  typeArticleBody(body) {
    this.articleBodyField.clear().type(body);
  }

  get articleTagField() {
    return cy.getByDataCy('article-tag-field');
  }

  typeArticleTag(tag) {
    this.articleTagField.type(tag);
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  publishArticle() {
    this.publishArticleBtn.click();
  }
};

export default EditArticlePageObject;
