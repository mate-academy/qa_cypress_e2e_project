import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get tagsField() {
    return cy.getByDataCy('article-tags');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  get editBtn() {
    return cy.getByDataCy('article-edit-btn');
  }

  get deleteBtn() {
    return cy.getByDataCy('article-delete-btn');
  }

  get articleTitle() {
    return cy.getByDataCy('article-title-h1');
  }

  get noArticleTitle() {
    return cy.getByDataCy('no-article-title');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.clear().type(body);
  }

  typeTag(tag) {
    this.tagsField.find('input').type(tag);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  clickEditBtn() {
    this.editBtn.eq(0).click();
  }

  clickDeleteBtn() {
    this.deleteBtn.eq(0).click();
  }

  verifyArticleTitle(value) {
    this.articleTitle.should('contain', value);
  }

  verifyNoArticleTitle(value) {
    this.noArticleTitle.should('contain', value);
  }
}

export default ArticlePageObject;
