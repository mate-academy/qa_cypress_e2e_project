import PageObject from '../PageObject';
const { faker } = require('@faker-js/faker');

class HomePageObject extends PageObject {
  url = '/#/editor';

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get articleDescription() {
    return cy.getByDataQa('article-description');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  get articleTags() {
    return cy.getByDataQa('article-tags');
  }

  get articleSubmit() {
    return cy.getByDataQa('article-submit');
  }

  get articleEdit() {
    return cy.getByDataQa('article-edit');
  }

  get articleDelete() {
    return cy.getByDataQa('article-delete');
  }

  typeTitle(title) {
    this.articleTitle.clear();
    this.articleTitle.type(title);
  }

  typeDescription(description) {
    this.articleDescription.clear();
    this.articleDescription.type(description);
  }

  typeBody(body) {
    this.articleBody.clear();
    this.articleBody.type(body);
  }

  typeTags(tag) {
    this.articleTags.click({ multiple: true });
    this.articleTags.type(tag);
  }

  clickSubmit() {
    this.articleSubmit.click();
  }

  clickEditArticle() {
    this.articleEdit.first().click();
  }

  clickDeteleArticle() {
    this.articleDelete.first().click();
  }

  createArticle(title, description, body, tags) {
    this.typeTitle(title);
    this.typeDescription(description);
    this.typeBody(body);
    this.typeTags(tags);
    this.clickSubmit();
  }

  editArticle() {
    this.typeTitle(faker.lorem.word());
    this.typeDescription(faker.lorem.words());
    this.typeBody(faker.lorem.words());
    this.typeTags(faker.lorem.word());
    this.clickSubmit();
  }
}

export default HomePageObject;
