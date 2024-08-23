import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title-field');
  }

  get newArticleLink() {
    return cy.getByDataQa('new-article-link');
  }

  get articleDescriptionField() {
    return cy.getByDataQa('article-description-field');
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body-field');
  }

  get articleTagsField() {
    return cy.getByDataQa('enter-tags-field');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  get editArticle() {
    return cy.getByDataQa('article-edit');
  }

  clickEditArticle() {
    this.editArticle
      .eq(0).click();
  }

  getArticleTitle() {
    return cy.get('h1');
  }

  getArticleBody() {
    return cy.get('p');
  }

  getArticlebody(articleBody) {
    return cy.contains('p', articleBody);
  }

  getArticleTitleLink(articleTitle) {
    return cy.contains('h1', articleTitle);
  }

  clickDeleteArticle() {
    this.deleteArticleBtn.eq(1).click();
  }

  clickOnNewArticleLink() {
    this.newArticleLink.click();
  }

  clickOnArticle(articleTitle) {
    this.getArticleTitleLink(articleTitle).click();
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeArticleDescription(description) {
    this.articleDescriptionField
      .type(description);
  }

  typeArticleBody(body) {
    this.articleBodyField
      .type(body);
  }

  typeArticleTags(tags) {
    this.articleTagsField
      .type(tags);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }
}

export default ArticlePageObject;
