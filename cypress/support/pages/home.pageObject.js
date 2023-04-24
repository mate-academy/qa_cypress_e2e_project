import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get yourFeedTab() {
    return cy.getByDataQA('your-feed-tab');
  }

  get globalFeedTab() {
    return cy.getByDataQA('global-feed-tab');
  }

  get tagList() {
    return cy.getByDataQA('tag-list');
  }

  get tag() {
    return cy.getByDataQA('tag');
  }

  get noArticleText() {
    return cy.getByDataQA('article-preview');
  }
}

export default HomePageObject;
