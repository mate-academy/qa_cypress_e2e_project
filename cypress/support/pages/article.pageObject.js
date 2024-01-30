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
    // eslint-disable-next-line max-len
    return cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-secondary > [data-qa="edit-button"]');
  }

  get deleteButton() {
    // eslint-disable-next-line max-len
    return cy.get('.container > .article-meta > :nth-child(3) > [data-qa="delete-button"] > span');
  }
};
