import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  typeArticleTitle(title) {
    this.articleTitleField.type(title);
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-description-field');
  }

  typeArticleDescription(description) {
    this.articleDescriptionField.type(description);
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  typeArticleBody(body) {
    this.articleBodyField.type(body);
  }

  get articleTagsField() {
    return cy.getByDataCy('article-tags-field');
  }

  typeArticleTags(tag) {
    this.articleBodyField.type(tag);
  }

  get articleSubmitBtn() {
    return cy.getByDataCy('article-sbmit-btn');
  }

  clickOnSubmitBtn() {
    this.articleSubmitBtn.click();
  }

  get articleTitleBunner() {
    return cy.getByDataCy('article-title-bunner');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  clickOnEditArticleBtn() {
    this.editArticleBtn.eq(0).click();
  }

  get delitArticleBtn() {
    return cy.getByDataCy('delite-article-btn');
  }

  clickOnDelitArticleBtn() {
    this.delitArticleBtn.eq(0).click();
  }
}
export default ArticlePageObject;
