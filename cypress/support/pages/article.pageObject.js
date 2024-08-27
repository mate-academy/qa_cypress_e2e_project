import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.findByPlaseholder('Article Title');
  }

  get articleAboutField() {
    return cy.findByPlaseholder(`What's this article about?`);
  }

  get articleBodyField() {
    return cy.findByPlaseholder('Write your article (in markdown)');
  }

  get articleTagsField() {
    return cy.get('[placeholder="Enter tags"]');
  }

  get articleAuthor() {
    return cy.get('.author');
  }

  get articlePublishBtn() {
    return cy.get('.btn-primary');
  }

  get articleEditBtn() {
    return cy.get('.btn-outline-secondary').eq(0);
  }

  get articleDelBtn() {
    return cy.get('.btn-outline-danger').eq(0);
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeArticleAbout(description) {
    this.articleAboutField
      .type(description);
  }

  typeArticleBody(body) {
    this.articleBodyField
      .type(body);
  }

  typeArticleTags(tags) {
    this.articleTagsField
      .type(tags + '{enter}');
  }

  clickPublishBtn() {
    this.articlePublishBtn
      .click();
  }

  clickEditBtn() {
    this.articleEditBtn
      .click();
  }

  clickDeleteBtn() {
    this.articleDelBtn
      .click();
  }

  assertArticleContainsTitle(title) {
    cy.get('.banner h1').should('contain', title);
  }

  assertArticleContainsBody(body) {
    cy.get('.article-content').should('contain', body);
  }

  assertArticleContainsAuthor(username) {
    this.articleAuthor
      .should('contain', username);
  }

  deleteBtn() {
    cy.get('.btn-outline-danger').click();
  }

  get deleteArticleBtn() {
    return cy.get('.btn-outline-danger').eq([1]);
  }

  clickDeleteArticle() {
    this.deleteArticleBtn.click();
  }
}

export default ArticlePageObject;