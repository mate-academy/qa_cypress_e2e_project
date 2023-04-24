import HomePageObject from './home.pageObject';

class NewArticlePageObject extends HomePageObject {
  url = '/#/editor';
  get title() {
    return cy.getByDataQA('article-title');
  }

  get description() {
    return cy.getByDataQA('article-description');
  }

  get body() {
    return cy.getByDataQA('article-body');
  }

  get tag() {
    return cy.get('input[data-qa="tags"]');
  }

  get publishArticleBtn() {
    return cy.getByDataQA('publish-article-btn');
  }
}

export default NewArticlePageObject;
