import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get newArticleBtn() {
    return cy.getByDataCy('new-article');
  }

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleDescription() {
    return cy.getByDataCy('article-description');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get articleTags() {
    return cy.getByDataCy('article-tags');
  }

  get articlePublishBtn() {
    return cy.getByDataCy('article-publish-btn');
  }

  get articleEditBtn() {
    return cy.getByDataCy('article-edit-btn');
  }

  get articleDeleteBtn() {
    return cy.getByDataCy('article-delete-btn');
  }

  // Методы для взаимодействия с элементами страницы

  newArticleForm() {
    this.newArticleBtn.click();
  }

  fillArticleTitle(title) {
    this.articleTitle.type(title);
  }

  fillArticleDescription(description) {
    this.articleDescription.type(description);
  }

  fillArticleBody(body) {
    this.articleBody.type(body);
  }

  fillArticleTags(tag) {
    this.articleTags.type(tag);
  }

  articleEdit() {
    this.articleEditBtn.eq(0).click();
  }

  clearArticleForm() {
    this.articleTitle.clear();
    this.articleDescription.clear();
    this.articleBody.clear();
    this.articleTags.clear();
  }

  publishArticle() {
    this.articlePublishBtn.click();
  }

  saveEditedArticle() {
    this.articlePublishBtn.click();
  }

  deleteArticle() {
    this.articleDeleteBtn.eq(0).click();
  }

  isArticleDeleted(title) {
    cy.get('h1').should('not.contain.text', title);
  }

  checkArticleTitle(title) {
    cy.get('h1').should('contain.text', title);
  }

  checkArticleContent(body) {
    cy.get('.row.article-content').should('contain.text', body);
  }

  isArticlePublished(title, body) {
    this.checkArticleTitle(title);
    this.checkArticleContent(body);
  }
}

export default ArticlePageObject;
