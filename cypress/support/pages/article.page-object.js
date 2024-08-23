import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = `#/editor`;

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

  get submitButton() {
    return cy.getByDataCy('submit-button');
  }

  get articleContainer() {
    return cy.getByDataCy('container');
  }

  get editButton() {
    return cy.getByDataCy('edit-button');
  }

  get deleteButton() {
    return cy.getByDataCy('delete-button');
  }
}
export default ArticlePageObject;
