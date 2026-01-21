import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.get('[data-qa="article-title-input"]');
  }

  get aboutField() {
    return cy.get('[data-qa="article-description-input"]');
  }

  get textField() {
    return cy.get('[data-qa="article-body-input"]');
  }

  get tagsField() {
    return cy.get('[data-qa="article-tags-input"] input');
  }

  get publishArticleBtn() {
    return cy.get('[data-qa="publish-article-btn"]');
  }

  get editArticleBtn() {
    return cy.get('[data-qa="edit-article-btn"]');
  }

  get deleteArticleBtn() {
    return cy.get('[data-qa="delete-article-btn"]');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeAbout(about) {
    this.aboutField.type(about);
  }

  typeText(text) {
    this.textField.type(text);
  }

  typeTag(tag) {
    this.tagsField.type(tag + '{Enter}');
  }

  clickNewArticleBtn() {
    cy.getByDataQa('new-article-btn').click();
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }
}

export default ArticlePageObject;
