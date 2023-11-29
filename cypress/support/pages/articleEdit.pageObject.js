import PageObject from '../PageObject';

class ArticleEditPageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataCy('title-field-article');
  }

  get articleAboutField() {
    return cy.getByDataCy('about-field-article');
  }

  get writeArticleTextarea() {
    return cy.getByDataCy('write-textarea-article');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-button-article');
  }

  // commands to fill fields
  fillArticleTitleField(title) {
    this.articleTitleField.type(title);
  }

  fillArticleAboutField(about) {
    this.articleAboutField.type(about);
  }

  fillWriteArticleTextarea(articleContent) {
    this.writeArticleTextarea.type(articleContent);
  }

  // commands to clear fields
  clearArticleTitleField() {
    this.articleTitleField.clear();
  }

  clearArticleAboutField() {
    this.articleAboutField.clear();
  }

  clearWriteArticleField() {
    this.writeArticleTextarea.clear();
  }

  // commands to click on buttons
  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}

export default ArticleEditPageObject;
