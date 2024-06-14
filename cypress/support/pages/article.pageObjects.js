import PageObject from '../PageObject';

class ArticlePage extends PageObject {
  url = '/#/editor';

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleDescription() {
    return cy.getByDataCy('article-description');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get articleTag() {
    return cy.getByDataCy('article-tag');
  }

  get articleBtn() {
    return cy.getByDataCy('article-btn');
  }

  get mainFeedBtn() {
    return cy.getByDataCy('main-feed');
  }

  get editBtn() {
    return cy.getByDataCy('article-edit');
  }

  get deleatBtn() {
    return cy.getByDataCy('article-deleat');
  }

  typeTitle(title) {
    this.articleTitle
      .type(title);
  }

  typeDescription(description) {
    this.articleDescription
      .type(description);
  }

  typeBody(body) {
    this.articleBody
      .type(body);
  }

  typeTag(tag) {
    this.articleTag
      .type(tag);
  }

  clickArticleBtn() {
    this.articleBtn
      .click();
  }

  clickEditBtn() {
    this.editBtn
        .eq(0).click();
  }

  clickDeleatBtn() {
    this.deleatBtn
        .eq(0).click();
  }

  clickFeedBtn() {
    this.mainFeedBtn
      .click();
  }

  clearTitle() {
    this.articleTitle
        .clear();
  }
  
  clearDescription() {
    this.articleDescription
        .clear();
  }

  clearBody() {
    this.articleBody
        .clear();
  }

  get articleTitleCheck() {
    return cy.getByDataCy('article-title-check');
  }

  get articleDeleatCheck() {
    return cy.getByDataCy('check-delete-article');
  }

  assertArticleTitleCheck(title) {
    this.articleTitleCheck
      .should('contain', title);
  }

  assertDeleatCheck() {
    this.articleDeleatCheck
      .should('contain', 'No articles are here... yet.');
  }
}

export default ArticlePage;