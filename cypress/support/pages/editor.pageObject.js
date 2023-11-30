import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
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

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article');
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
    this.titleField.clear().type(title);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}

export default SignInPageObject;