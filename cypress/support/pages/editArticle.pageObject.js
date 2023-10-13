import PageObject from "../PageObject";

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField () {
    return cy.getByDataCy('article-title-field');
  }

  get articleDespriptionField () {
    return cy.getByDataCy('about-article-field');
  }

  get articleBodyField () {
    return cy.getByDataCy('article-body-field');
  }

  get articleTagsField () {
    return cy.getByDataCy('article-tags-field');
  }

  get publishArticleBtn () {
    return cy.getByDataCy('publish-article-btn');
  }

  updateAticleTitle (title) {
    this.articleTitleField.clear();
    this.articleTitleField.type(title);
  }

  updateArticleBody (body) {
    this.articleBodyField.clear();
    this.articleBodyField.type(body);
  }

  updateArticleDescription (description) {
    this.articleDespriptionField.clear();
    this.articleDespriptionField.type(description);
  }

  updateArticleTags (tag) {
    this.articleTagsField.eq(0).type(tag);
  }

  typeArticleTitle (title) {
    this.articleTitleField.type(title);
  }

  typeArticleBody (body) {
    this.articleBodyField.type(body);
  }

  typeArticleDespription (description) {
    this.articleDespriptionField.type(description);
  }

  typeArticleTags (tags) {
    this.articleTagsField.eq(0).type(tags);
  }

  clickPublishBtn () {
    this.publishArticleBtn.click();
  }

  createArticle (title, body, description, tags) {
    this.typeArticleTitle(title);
    this.typeArticleBody(body);
    this.typeArticleDespription(description);
    this.typeArticleTags(tags);
    this.clickPublishBtn();
  }

  updateArticle (title, body, description, tags) {
    this.updateAticleTitle(title);
    this.updateArticleBody(body);
    this.updateArticleDescription(description);
    this.updateArticleTags(tags);
    this.clickPublishBtn();
  }

  visit () {
    cy.visit(this.url);
  }
}

export default EditArticlePageObject;