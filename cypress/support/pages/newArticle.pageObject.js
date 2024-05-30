import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '#/editor';
  get newArticleLink() {
    return cy.getByDataQa('new-article-link');
  }

  get artilcleTitleField() {
    return cy.getByDataQa('article-title-field');
  }

  get descriptionField() {
    return cy.getByDataQa('about-article-field');
  }

  get articleBody() {
    return cy.getByDataQa('article-body-field');
  }

  get articleTag() {
    return cy.getByDataQa('tags-field');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  typeArticleTitle(title) {
    this.artilcleTitleField
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  typeArticleBody(body) {
    this.articleBody
      .type(body);
  }

  typeArticteTag(tags) {
    this.articleTag.eq(0)
      .type(tags);
  }

  clickPublishBtn() {
    this.publishArticleBtn.click();
  }

  clearArticleTitle() {
    this.artilcleTitleField
      .clear();
  }

  clearArticleBody() {
    this.articleBody
      .clear();
  }

  clearArticleDescription() {
    this.descriptionField
      .clear();
  }

  clearArticleTag() {
    this.articleTag.eq(0)
      .clear();
  }
}
export default NewArticlePageObject;
