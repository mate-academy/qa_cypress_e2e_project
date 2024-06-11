import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title-field');
  }

  get articleDescriptionField() {
    return cy.getByDataQa('article-description-field');
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body-field');
  }

  get articleTagsField() {
    return cy.getByDataQa('article-tags-field');
  }

  get publishArticleButton() {
    return cy.getByDataQa('publish-article-button');
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

  typeArticleTag(tag) {
    this.articleTagsField.eq(1)
      .type(tag);
  }

  typeArticleTags(tags) {
    this.articleTagsField.eq(1)
      .type(tags);
  }

  clickPublishArticle() {
    this.publishArticleButton
      .click();
  }

  get articleTitle() {
    return cy.getByDataQa('title-article-page');
  }

  get articleAuthor() {
    return cy.getByDataQa('author-article-page');
  }

  get articleBody() {
    return cy.getByDataQa('content-article-page');
  }

  get articleTags() {
    return cy.getByDataQa('tags-article-page');
  }

  assertArticleContainsTitle(title) {
    this.articleTitle
      .should('contain', title);
  }

  assertArticleContainsAuthor(username) {
    this.articleAuthor
      .should('contain', username);
  }

  assertArticleContainsBody(body) {
    this.articleBody
      .should('contain', body);
  }

  assertArticleContainsTag(tags) {
    this.articleTags
      .should('contain', tags);
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn');
  };

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
  };

  clickDeleteArticle() {
    this.deleteArticleBtn.eq(0).click();
  }

  clickEditArticle() {
    this.editArticleBtn.eq(0).click();
  }
};

export default ArticlePageObject;
