import PageObject from '../PageObject';

class EditorPageObject extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.getByDataCy('title-field');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  get descriptionField() {
    return cy.getByDataCy('description-field');
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  get bodyField() {
    return cy.getByDataCy('body-field');
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  get tagsField() {
    return cy.getByDataCy('tags-field');
  }

  typeTags(tag) {
    this.tagsField.first().type(`${tag}{enter}`);
  }

  get publishButton() {
    return cy.getByDataCy('submit-button');
  }

  clickPublishButton() {
    this.publishButton.click();
  }

  typeNewArticle(newTitle, newDescription, newBody, newTag) {
    this.titleField.clear();
    this.descriptionField.clear();
    this.bodyField.clear();
    this.tagsField.clear();
    this.titleField.type(newTitle);
    this.descriptionField.type(newDescription);
    this.bodyField.type(newBody);
    this.tagsField.type(newTag);
  }

  login(email, username, password) {
    cy.login(email, username, password);
  }

  createArt(title, description, body, tags) {
    cy.createArticle(title, description, body, tags);
  }
}

export default EditorPageObject;
