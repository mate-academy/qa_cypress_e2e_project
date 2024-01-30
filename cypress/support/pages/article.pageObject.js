import PageObject from '../PageObject';

export class ArticlePageObject extends PageObject {
  url = '/#/editor';
  get articleTitleField() {
    return cy.getByDataQa('article-title-field');
  }

  get aboutField() {
    return cy.getByDataQa('about-field');
  }

  get articleField() {
    return cy.get('[data-qa="article-field"] > .form-control');
  }

  get tagField() {
    return cy.get('.vue-tags-input');
  }

  get publishButton() {
    return cy.getByDataQa('publish-button');
  }

  get editButton() {
    return cy.getByDataQa('edit-button').first();
  }

  get deleteButton() {
    return cy.getByDataQa('delete-button').last();
  }
};
