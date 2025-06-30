/// <reference types="cypress" />
/// <reference types="../../support" />

import PageObject from '../PageObject';

class EditorArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get tagsField() {
    return cy.getByDataCy('article-tags');
  }

  get createButton() {
    return cy.getByDataCy('create-article-button');
  }

  typeTitle(title) {
    return this.titleField.clear().type(title);
  }

  typeDescription(description) {
    return this.descriptionField.clear().type(description);
  }

  typeBody(body) {
    return this.bodyField.clear().type(body);
  }

  typeTags(tags) {
    return this.tagsField.clear().type(tags.join('{Enter}') + '{Enter}');
  }

  fillForm({ title, description, body, tags }) {
    this.typeTitle(title);
    this.typeDescription(description);
    this.typeBody(body);
    this.typeTags(tags);
  }

  clickOnCreateButton() {
    return this.createButton.click();
  }
}

export default EditorArticlePageObject;
