/* eslint-disable max-len */
import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  typeArticleTitle(articleTitle) {
    cy.getByPlaceholder('Article Title').type(articleTitle);
  }

  typeArticleDescription(articleDescription) {
    cy.getByPlaceholder('What\'s this article about?').type(articleDescription);
  }

  typeArticleBody(articleBody) {
    cy.getByPlaceholder('Write your article (in markdown)').type(articleBody);
  }

  typeArticleTags(articleTags) {
    cy.getByPlaceholder('Enter tags').type(articleTags);
  }

  get publishArticleBtn() {
    return cy.contains('.btn', 'Publish Article');
  }

  clickOnPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  assertArticleUrl() {
    cy.url().should('include', 'article');
  }

  get editArticleBtn() {
    return cy.contains('.btn', 'Edit Article');
  }

  clickOnEditArticleBtn() {
    this.editArticleBtn.click();
  }

  editArticleTitle(articleTitle) {
    cy.getByPlaceholder('Article Title').type(articleTitle);
  }

  editArticleDescription(articleDescription) {
    cy.getByPlaceholder('What\'s this article about?').type(articleDescription);
  }

  editArticleBody(articleBody) {
    cy.getByPlaceholder('Write your article (in markdown)').type(articleBody);
  }

  editArticleTags(articleTags) {
    cy.getByPlaceholder('Enter tags').type(articleTags);
  }

  get deleteArticleBtn() {
    return cy.contains('.btn', 'Delete Article');
  }

  clickOnDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  assertDeleteArticleUrl() {
    cy.url().should('eq', 'http://localhost:1667/#/');
  }
}
export default ArticlePageObject;
