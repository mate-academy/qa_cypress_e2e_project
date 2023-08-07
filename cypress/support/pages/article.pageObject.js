import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  visitWithSlug(slug, userId) {
    cy.visit(`http://localhost:1667/#/articles/${slug}?user_id=${userId}`);
  }

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .type(title);
  }

  get articleAboutField() {
    return cy.getByDataCy('article-about-field');
  }

  typeArticleDesc(description) {
    this.articleAboutField
      .type(description);
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  typeArticleBody(body) {
    this.articleBodyField
      .type(body);
  }

  get articleTagsField() {
    return cy.getByDataCy('article-tags-field');
  }

  typeArticleTags(tag) {
    this.articleTagsField
      .first()
      .type(tag);
  }

  get PublishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  clickPublishArticleBtn() {
    this.PublishArticleBtn
      .click();
  }

  assertArticleTitle(title) {
    cy.get('h1')
      .should('be.visible', title)
      .should('have.text', title);
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  clickEditArticleBtn() {
    this.editArticleBtn
      .first()
      .click();
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn
      .first()
      .click();
  }

  assertArticleBodyMatches(body) {
    cy.get('p').should('have.text', body);
  }

  assertDeletedArticleMessage(message) {
    cy.get('.swal-text').should('have.text', message);
  }
}

export default ArticlePageObject;
