import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.get('input[placeholder="Article Title"]');
  }

  get aboutField() {
    return cy.get(`input[placeholder="What's this article about?"]`);
  }

  get textField() {
    return cy.get('textarea[placeholder="Write your article (in markdown)"]');
  }

  get tagsField() {
    return cy.get('input[placeholder="Enter tags"]');
  }

  get publishArticleBtn() {
    return cy.contains('button', 'Publish Article');
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

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}

export default ArticlePageObject;
