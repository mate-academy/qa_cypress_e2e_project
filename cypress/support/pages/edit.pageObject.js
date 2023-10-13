import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('article-title');
  }

  get descriptionField() {
    return cy.getByDataQa('article-description');
  }

  get bodyField() {
    return cy.getByDataQa('article-body');
  }

  get tagsField() {
    return cy.getByDataQa('article-tags');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article');
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

  changeTitleField(title) {
    this.titleField.value = '';
    this.titleField.value = title;
  }

  changeDescriptionField(description) {
    this.descriptionField.value = '';
    this.descriptionField.value = description;
  }

  changeBodyField(body) {
    this.bodyField.value = '';
    this.bodyField.value = body;
  }

  changeTagsField(tags) {
    this.tagsField.value = '';
    this.tagsField.value = tags;
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}

export default SignInPageObject;