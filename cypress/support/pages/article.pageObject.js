import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles';

  visitWithSlug(slug, userId) {
    cy.visit(`${this.url}/${slug}?user_id=${userId}`);
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
      .should('be.visible', title);
  }
}

export default ArticlePageObject;
