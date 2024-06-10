import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  get titleArticleField() {
    return cy.findByPlaceholder('Article Title');
  }

  get aboutArticleField() {
    return cy.findByPlaceholder('What\'s this article about?');
  }

  get bodyArticleField() {
    return cy.findByPlaceholder('Write your article (in markdown)');
  }

  get tagsArticleField() {
    return cy.findByPlaceholder('Enter tags');
  }

  get publishArticleBtn() {
    return cy.contains('button', 'Publish Article');
  }

  clearUsername() {
    this.usernameField.clear();
  }

  clearEmail() {
    this.emailField.clear();
  }

  typeTitleArticle(title) {
    this.titleArticleField
      .type(title);
  }

  typeAboutArticle(description) {
    this.aboutArticleField
      .type(description);
  }

  typeBodyArticle(body) {
    this.bodyArticleField
      .type(body);
  }

  typeTagsArticle(tag) {
    this.tagsArticleField
      .type(tag);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }
}

export default ArticleEditorPageObject;
