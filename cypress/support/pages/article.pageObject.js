import PageObject from "../PageObject";

class CreateArticlePageObject extends PageObject {
  url = '/#/editor';

  get ArticleTitle() {
    return cy.getByDataQa('article-title');
  }

  typeArticleTitle(title) {
    cy.getByDataQa('article-title').type(title);
  }

  typeNewArticleTitle(title) {
    this.ArticleTitle.type(`{selectAll}${title}`);
  }

  fillBlankArticleTitle() {
    this.ArticleTitle.click().clear();
  }

  typeArticleDescription(description) {
    cy.getByDataQa('article-description').type(description);
  }

  typeNewArticleDescription(description) {
    cy.getByDataQa('article-description').clear().type(description);
  }

  typeArticleBody(ArticleBody) {
    cy.getByDataQa('article-body').type(ArticleBody);
  }

  typeNewArticleBody(ArticleBody) {
    cy.getByDataQa('article-body').clear().type(ArticleBody);
  }

  typeArticleTag(tag) {
    cy.getByDataQa('article-tags').eq(0).type(tag);
  }

  clickOnPublishArticleBtn() {
    cy.getByDataQa('publish-article-btn').click();
  }

  assertArticleTitle(title) {
    cy.getByDataQa('article-title').should('contain', title);
  }

  assertArticleBody(body) {
    cy.getByDataQa('article-body').should('contain', body);
  }

  assertEditBtn() {
    cy.getByDataQa('edit-article-btn').should('exist');
  }

  clickOnEditBtn() {
    cy.getByDataQa('edit-article-btn').eq(0).click();
  }

  clickOnDeleteBtn() {
    cy.getByDataQa('delete-article-btn').eq(0).click();
  }

  assertDeleteBtn() {
    cy.getByDataQa('edit-article-btn').should('exist');
  }

  assertOopsError() {
    cy.get('.swal-title')
      .should('contain', 'Oops!');
  }
}
export default CreateArticlePageObject;
