import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField () {
    return cy.getByDataCy('article-title');
  }

  get articleAboutField () {
    return cy.getByDataCy('article-about');
  }

  get articleBodyField () {
    return cy.getByDataCy('article-body');
  }

  get articleTagsField () {
    return cy.getByDataCy('article-tags');
  }

  get articleTitlePage () {
    return cy.getByDataCy('article-page-title');
  }

  get articleBodyPage () {
    return cy.getByDataCy('article-page-body');
  }

  get publishArticleButton() {
    return cy.getByDataCy('publish-article-button');
  }

  get editArticleButton() {
    return cy.getByDataCy('edit-article-button').first();
  }

  get deleteArticleButton() {
    return cy.getByDataCy('delete-article-button').first();
  }

  get articlePreview() {
    return cy.getByDataCy('article-list');
  }

  typeArticleItile(articleTitle) {
    this.articleTitleField
      .type(articleTitle);
  }

  typeArticleAbout(articleAbout) {
    this.articleAboutField
      .type(articleAbout);
  }

  typeArticleBody(articleBody) {
    this.articleBodyField.clear()
      .type(articleBody);
  }

  typeArticleTags(tag) {
    this.articleTagsField
      .type(tag);
  }

  clickPublishArticleButton() {
    this.publishArticleButton
      .click();
  }

  clickEditArticleButton() {
    this.editArticleButton
      .click();
  }

  clickDeleteArticleButton() {
    this.deleteArticleButton
      .click();
  }

  assertArticleTitlePage(title) {
    this.articleTitlePage
      .should('contain', title);
  }

  assertArticleBodyPage(body) {
    this.articleBodyPage
      .should('contain', body);
  }

  assertArticlePreview() {
    this.articlePreview
      .should('contain', 'No articles are here... yet.');
  }
}

export default ArticlePageObject;
