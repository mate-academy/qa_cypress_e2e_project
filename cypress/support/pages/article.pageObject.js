import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title');
  }

  get articleAboutField() {
    return cy.getByDataQa('article-about');
  }

  get articleBioField() {
    return cy.getByDataQa('article-bio');
  }

  get articleBtn() {
    return cy.get('button.btn.btn-lg.pull-xs-right.btn-primary');
  }

  get articleAssert() {
    return cy.get('h1');
  }

  get editArticle() {
    return cy.getByDataQa('article-edit-button');
  }

  get deleteArticle() {
    return cy.getByDataQa('article--button');
  }

  get assertEdit() {
    return cy.get('button.btn.btn-lg.pull-xs-right.btn-primary');
  }

  get assertDelete() {
    return cy.get('.article-preview');
  }

  typeArticleTitleField(articleTitle) {
    this.articleTitleField
      .type(articleTitle);
  }

  typeArticleAboutField(articleAbout) {
    this.articleAboutField
      .type(articleAbout);
  }

  typeArticleBioField(articleBio) {
    this.articleBioField
      .type(articleBio);
  }

  clickArticlePublishBtn() {
    this.articleBtn
      .click();
  }

  assertArticleTitle(articleTitle) {
    this.articleAssert
      .should('contain', articleTitle);
  }

  clickEditArticle() {
    this.editArticle
      .eq(0)
      .click();
  }

  clickDeleteArticle() {
    this.deleteArticle
      .eq(0)
      .click();
  }

  assertEditArticle(text) {
    this.assertEdit
      .should('contain', text);
  }

  assertDeleteArticle(value) {
    this.assertDelete
      .should('contain', value);
  }
}

export default ArticlePageObject;
