import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title-edit');
  }

  get aboutField() {
    return cy.getByDataCy('article-description-edit');
  }

  get textField() {
    return cy.getByDataCy('article-body-edit');
  }

  get publishArticleButton() {
    return cy.getByDataCy('article-publish-button');
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

  clickPublishArticleButton() {
    this.publishArticleButton.click();
  }
}

export default ArticlePageObject;
