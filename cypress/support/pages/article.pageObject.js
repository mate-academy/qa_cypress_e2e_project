import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.get('[data-qa="article-title-input"]');
  }

  get aboutField() {
    return cy.get('[data-qa="article-about-input"]');
  }

  get textField() {
    return cy.get('[data-qa="article-textarea"]');
  }

  get tagsField() {
    return cy.get('[data-qa="article-tags-input"]');
  }

  get publishArticleButton() {
    return cy.get('[data-qa="publish-article-btn"]');
  }

  typeTitle(title) {
    this.titleField.clear().type(title);
  }

  typeAbout(about) {
    this.aboutField.clear().type(about);
  }

  typeText(text) {
    this.textField.clear().type(text);
  }

  typeTag(tag) {
    this.tagsField.clear().type(`${tag}{enter}`);
  }

  clickPublishArticleButton() {
    this.publishArticleButton.click();
  }
}

export default ArticlePageObject;
