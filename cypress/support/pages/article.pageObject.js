import PageObject from './PageObject';

class ArticlePageObject extends PageObject {
  get newArticleLink() {
    return cy.getByDataQa('new-article-link');
  }

  get articleTitleField() {
    return cy.getByDataQa('article-title');
  }

  get articleAboutField() {
    return cy.getByDataQa('article-about');
  }

  get articleContentField() {
    return cy.getByDataQa('article-content');
  }

  get articleTagsField() {
    return cy.getByDataQa('article-tags');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  get articleTitle() {
    return cy.getByDataQa('article-title-display');
  }

  get articleContent() {
    return cy.getByDataQa('article-content-display');
  }

  get errorMessages() {
    return cy.getByDataQa('error-messages');
  }

  visitNewArticle() {
    cy.visit('/#/editor');
    return this;
  }

  clickNewArticle() {
    this.newArticleLink.click();
  }

  typeTitle(title) {
    this.articleTitleField.type(title);
  }

  typeAbout(about) {
    this.articleAboutField.type(about);
  }

  typeContent(content) {
    this.articleContentField.type(content);
  }

  typeTags(tags) {
    this.articleTagsField.type(tags);
  }

  clickPublishArticle() {
    this.publishArticleBtn.click();
  }

  clickEditArticle() {
    this.editArticleBtn.click();
  }

  clickDeleteArticle() {
    this.deleteArticleBtn.click();
  }
}

export default ArticlePageObject;
