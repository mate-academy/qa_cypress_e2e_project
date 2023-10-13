import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  visit(title) {
    cy.visit(`#/editor/${title}`);
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

  get saveButton() {
    return cy.getByDataCy('submit-btn');
  }

  typeTitle(title) {
    this.titleField.clear().type(title);
  }

  typeDescription(description) {
    this.descriptionField.clear().type(description);
  }

  typeBody(body) {
    this.bodyField.clear().type(body);
  }

  clickSaveButton() {
    this.saveButton.click();
  }

  assertContainTitle(title) {
    cy.get('h1').should('contain', title);
  }

  assertContainBody(body) {
    cy.get('p').should('contain', body);
  }
}

export default EditArticlePageObject;
