import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitle() {
    return cy.getByDataCy('edit-article-title');
  }

  get articleAbout() {
    return cy.getByDataCy('edit-article-description');
  }

  get articleWrite() {
    return cy.getByDataCy('edit-article-body');
  }

  get articleTags() {
    return cy.getByDataCy('edit-article-tags');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  get checkTitle() {
    return cy.getByDataCy('article-title');
  }

  get checkBody() {
    return cy.getByDataCy('article-body');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  get FollowUserBtn() {
    return cy.getByDataCy('follow-user-btn');
  }

  typeTitle(title) {
    this.articleTitle
      .type(title);
  }

  typeDescription(description) {
    this.articleAbout
      .type(description);
  }

  typeBody(body) {
    this.articleWrite
      .type(body);
  }

  typeTags(tag) {
    this.articleTags.first()
      .type(tag);
  }

  clickOnPublishBtn() {
    this.publishBtn
      .click();
  }

  checkArticleTitle(title) {
    this.checkTitle
      .should('contain', title);
  }

  checkArticleBody(body) {
    this.checkBody
      .should('contain', body);
  }

  clickOnEditBtn() {
    this.editArticleBtn
      .first()
      .click();
  }

  clickOnDeleteBtn() {
    this.deleteArticleBtn
      .first()
      .click();
  }

  clickOnFollowUser() {
    this.FollowUserBtn
      .first()
      .click();
  }
}

export default ArticlePageObject;
