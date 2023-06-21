import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title-new-article');
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeNewArticleTitle(newTitle) {
    this.articleTitleField
      .type(`{selectAll}${newTitle}`);
  }

  get articleDescriptionField() {
    return cy.getByDataQa('article-about-new-article');
  }

  typeArticleDescription(description) {
    this.articleDescriptionField
      .type(description);
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body-new-article');
  }

  typeArticleBody(body) {
    this.articleBodyField
      .type(body);
  }

  typeNewArticleBody(newBody) {
    this.articleBodyField
      .type(`{selectAll}${newBody}`);
  }

  get articleTagField() {
    return cy.getByDataQa('tag-new-article')
      .eq(1);
  }

  typeArticleTag(tag) {
    this.articleTagField
      .type(tag);
  }

  get submitBtn() {
    return cy.getByDataQa('submit-btn-new-article');
  }

  clickSubmitBtn() {
    this.submitBtn
      .click();
  }
}

export default NewArticlePageObject;
