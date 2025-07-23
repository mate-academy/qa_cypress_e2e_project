/// <reference types="cypress" />
/// <reference types="../../support" />

import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  constructor(title = '') {
    super();

    this.url = `/#/articles/${title.replace(/ /g, '-').toLowerCase()}`;
  }

  get title() {
    return cy.getByDataCy('article-title');
  }

  get description() {
    return cy.getByDataCy('article-description');
  }

  get body() {
    return cy.getByDataCy('article-body');
  }

  get tags() {
    return cy.getByDataCy('article-tag');
  }

  get editButton() {
    return cy.getByDataCy('edit-article-button').eq(0);
  }

  get deleteButton() {
    return cy.getByDataCy('delete-article-button').eq(0);
  }

  checkTitle(title) {
    return this.title.should('have.text', title);
  }

  checkBody(body) {
    return this.body.should('have.text', body + '\n');
  }

  checkTags(tags) {
    return this.tags.each((tag, i) => {
      cy.wrap(tag).should('have.text', tags[i]);
    });
  }

  checkArticle({ title, body, tags }) {
    this.checkTitle(title);
    this.checkBody(body);
    this.checkTags(tags);
  }

  clickOnEditButton() {
    return this.editButton.click();
  }

  clickOnDeleteButton() {
    return this.deleteButton.click();
  }
}

export default ArticlePageObject;
