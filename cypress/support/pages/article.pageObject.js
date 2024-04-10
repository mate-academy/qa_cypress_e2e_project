import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get titleField() {
    return cy.getByPlaceholder('Article Title');
  }

  get descriptionField() {
    return cy.getByPlaceholder('What\'s this article about?');
  }

  get bodyField() {
    return cy.getByPlaceholder('Write your article (in markdown)');
  }

  get tagField() {
    return cy.getByPlaceholder('Enter tags');
  }

  get publishBtn() {
    return cy.getByType('submit');
  }

  get editBtn() {
    return cy.contains('.btn', 'Edit Article');
  }

  get deleteBtn() {
    return cy.contains('.btn', 'Delete Article');
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  typeBody(body) {
    this.bodyField
      .type(body);
  }

  typeTag(tag) {
    this.tagField
      .type(tag);
  }

  clickPublishBtn() {
    this.publishBtn
      .click();
  }

  clickEditBtn() {
    this.editBtn
      .click();
  }

  clickDeleteBtn() {
    this.deleteBtn
      .click();
  }

  AsssertDelete() {
    // eslint-disable-next-line max-len
    cy.get('.container > p').should('contain', 'A place to share your knowledge.');
  }
}

export default ArticlePageObject;
