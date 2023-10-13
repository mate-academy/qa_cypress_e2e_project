import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get titleField() {
    return cy.getByDataCy('title-field');
  }

  get descriptionField() {
    return cy.getByDataCy('description-field');
  }

  get bodyField() {
    return cy.getByDataCy('body-field');
  }

  get tagField() {
    return cy.getByDataCy('tag-field');
  }

  get submitBtn() {
    return cy.getByDataCy('submit-btn');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  typeTag(tag) {
    this.tagField.type(tag).type('{enter}');
  }

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertContainTitle(title) {
    cy.get('h1').should('contain', title);
  }

  assertContainBody(body) {
    cy.get('p').should('contain', body);
  }
}

export default ArticlePageObject;
