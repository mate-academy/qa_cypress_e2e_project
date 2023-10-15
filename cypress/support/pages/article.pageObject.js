import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get artilcleTitleField() {
    return cy.getByDataQa('article-title-field');
  }

  get whatIsThisArticleAboutField() {
    return cy.getByDataQa('what-is-this-article-about');
  }

  get writeYourArticleField() {
    return cy.getByDataQa('write-your-article-field');
  }

  get enterTagsField() {
    return cy.getByDataQa('enter-tags-field');
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

  get createdArticleTitle() {
    return cy.getByDataQa('created-article-title');
  }

  typeArticleTitle(articleTitle) {
    this.artilcleTitleField
      .type(articleTitle);
  }

  updateArticleTitle(articleTitle) {
    this.artilcleTitleField
      .clear()
      .type(articleTitle);
  }

  typeArticleDescription(articleDescription) {
    this.whatIsThisArticleAboutField
      .type(articleDescription);
  }

  updateArticleDescription(articleDescription) {
    this.whatIsThisArticleAboutField
      .clear()
      .type(articleDescription);
  }

  typeArticleBody(articleBody) {
    this.writeYourArticleField
      .type(articleBody);
  }

  updateArticleBody(articleBody) {
    this.writeYourArticleField
      .type(articleBody);
  }

  typeArticleTags(tag) {
    this.enterTagsField
      .eq(0)
      .type(tag);
  }

  updateArticleTags(tag) {
    this.enterTagsField
      .eq(0)
      .clear('{selectall}')
      .type(tag);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn
      .first()
      .click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn
      .first()
      .click();
  }
}

export default ArticlePageObject;