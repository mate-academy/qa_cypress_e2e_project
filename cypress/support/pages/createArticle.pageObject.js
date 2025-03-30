import PageObject from '../PageObject';

class CreateArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('articleTitleField');
  }

  get aricleAboutField() {
    return cy.getByDataCy('articleAboutField');
  }

  get articleBodyField() {
    return cy.getByDataCy('articleBodyField');
  }

  get articleTagField() {
    return cy.getByDataCy('articleTagField');
  }

  get submitButton() {
    return cy.getByDataCy('articleSubmitButton');
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeAricleAbout(about) {
    this.aricleAboutField
      .type(about);
  }

  typeArticleBody(body) {
    this.articleBodyField
      .type(body);
  }

  typeArticleTag(tag) {
    this.articleTagField
      .type(`${tag}{enter}`);
  }

  clickSubmitButton() {
    this.submitButton
      .click();
  }
}

export default CreateArticlePageObject;
