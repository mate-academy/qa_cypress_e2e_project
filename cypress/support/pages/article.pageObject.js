/* eslint-disable */
import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';
  
  get articleTitle() {
    return cy.get(':nth-child(1) > .form-control');
  }

  get articleAbout() {
    return cy.get(':nth-child(2) > .form-control');
  }

  get articleBody() {
    return cy.get(':nth-child(3) > .form-control');
  }

  get publishArticleBtn() {
    return cy.get('.btn');
  }

  get editArticleBtn() {
    return cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-secondary > span');
  }

  get deleteArticleBtn() {
    return cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger > span')
  }

  typeTitle(title) {
    this.articleTitle
      .type(title);
  }

  typeAbout(about) {
    this.articleAbout
      .type(about);
  }

  typeBody(body) {
    this.articleBody
      .type(body);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn
      .click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn
      .click();
  }
}

export default ArticlePageObject;