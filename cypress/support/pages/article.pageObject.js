import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get username() {
    return cy.getByDataCy('username-link');
  };

  get titleField() {
    return cy.getByDataCy('title-field');
  };

  get descriptionField() {
    return cy.getByDataCy('description-field');
  };

  get bodyField() {
    return cy.getByDataCy('body-field');
  };

  get submitButton() {
    return cy.getByDataCy('submit_button');
  };

  get titleOnArticlePage() {
    return cy.getByDataCy('title-article-page');
  };

  get contentOnArticlePage() {
    return cy.getByDataCy('article-content');
  };

  get editButton() {
    return cy.getByDataCy('edit-button');
  };

  get deleteButton() {
    return cy.getByDataCy('delete-button');
  };

  get globalFeed() {
    return cy.getByDataCy('global-feed');
  }

  assertUsernameAfterLogin(username) {
    this.username.should('contain.text', username);
  };

  typeIntoTitleField(title) {
    this.titleField.type(title);
  };

  typeIntoDescriptionField(description) {
    this.descriptionField.type(description);
  };

  typeIntoBodyField(body) {
    this.bodyField.type(body);
  };

  clickOnSubmit() {
    this.submitButton.click();
  };

  assertUrl(url) {
    cy.url().should('include', `/articles/${url}`);
  };

  assertUrlNotContain(text) {
    cy.url().should('not.contain', text);
  };

  assertArticleTitle(title) {
    this.titleOnArticlePage.should('contain.text', title);
  };

  assertArticleContent(body) {
    this.contentOnArticlePage.should('contain.text', body);
  };

  clickOnEditArticleButton() {
    this.editButton.first().click();
  };

  clickOnDeleteArticleButton() {
    this.deleteButton.first().click();
  };

  clickOnNameLink() {
    this.username.click();
  }

  assertGlobalFeedAfterDeleting(title) {
    this.globalFeed.should('not.contain', title);
  }
};

export default ArticlePageObject;
