import PageObject from '../PageObject';

class EditPageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  };

  get articleAboutField() {
    return cy.getByDataCy('article-about-field');
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  get articleTagsField() {
    return cy.getByDataCy('article-tags-field');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  typeTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeAbout(about) {
    this.articleAboutField
      .type(about);
  }

  typeBody(body) {
    this.articleBodyField
      .type(body);
  }

  typeTags(tags) {
    this.articleTagsField
      .click().type(`${tags}{enter}`);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }
}

export default EditPageObject;
