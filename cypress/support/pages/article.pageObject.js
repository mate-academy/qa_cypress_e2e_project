import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.get('[data-qa="new-article-title"]');
  }

  get articleDescriptionField() {
    return cy.get('[data-qa="new-article-description"]');
  }

  get articleField() {
    return cy.get('[data-qa="new-article"]');
  }

  get publishedBtn() {
    return cy.get('[data-qa="published-article-btn"]');
  }

  get userContainerArticle() {
    return cy.get('[class="container"]');
  }

  get editArticleBtn() {
    return cy.get('[data-qa="edit-article-btn"]').eq(0);
  }

  get deleteArticleBtn() {
    return cy.get('[data-qa="delete-article-btn"]').eq(0);
  }

  updateArticleTitle(articleTitle) {
    this.articleTitleField
    .clear()
    .type(articleTitle);
  }

  updateArticleDescription(articleDescription) {
    this.articleDescriptionField
    .clear()
    .type(articleDescription);
  }

  updateArticle(article) {
    this.articleField
    .clear()
    .type(article);
  }

  clickOnDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  clickOnEditArticleBtn() {
    this.editArticleBtn.click();
  }

  assertArticleTitle(articleTitle) {
    this.userContainerArticle
    .should('contain', articleTitle)
  }

  fillArticleTitleField(title) {
    this.articleTitleField.type(title);
  }

  fillArticleDecriptionField(description) {
    this.articleDescriptionField.type(description)
  }

  fillArticleField(article) {
    this.articleField.type(article);
  }

  clickOnPublishedArticleBtn() {
    this.publishedBtn.click();
  }

}
export default ArticlePageObject;