import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor';

  get titileField() {
    return cy.getByDataQa('article-title-edit');
  }

  get descriptionField() {
    return cy.getByDataQa('article-description-edit');
  }

  get bodyField() {
    return cy.getByDataQa('article-body-edit');
  }

  get tagField() {
    return cy.getByDataQa('article-tag-edit');
  }
  
  get createBtn() {
    return cy.getByDataQa('create-article-btn');
  }

  typeArticleTitle(title) {
    this.titileField.type(title);
  }

  typeUpdatedArticleTitle(title) {
    this.titileField.clear().type(title);
  }

  typeArticleDescription(description) {
    this.descriptionField.type(description);
  }

  typeUpdatedArticleDescription(description) {
    this.descriptionField.clear().type(description);
  }

  typeArticleBody(body) {
    this.bodyField.type(body);
  }

  typeUpdatedArticleBody(body) {
    this.bodyField.clear().type(body);
  }

  typeArticleTag(tag) {
    this.tagField.eq(0).type(tag);
  }

  clickNewArticleButton() {
    this.createBtn.click();
  }

}

export default NewArticlePageObject;
