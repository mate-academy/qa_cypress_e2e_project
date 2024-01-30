import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByPlaceholder('Article Title');
  }

  get descriptionField() {
    return cy.getByPlaceholder('What\'s this article about?');
  }

  get bodyField() {
    return cy.getByPlaceholder('Write your article (in markdown)');
  }

  get tagsField() {
    return cy.getByPlaceholder('Enter tags');
  }

  get publishButton() {
    return cy.getByDataQa('PublishButton');
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

  typeTags(tags) {
    this.tagsField.type(tags);
  }

  clickPublishButton() {
    this.publishButton.click();
  }
}

export default ArticlePageObject;
