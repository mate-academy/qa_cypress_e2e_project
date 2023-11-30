import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title');
  }

  get articleAboutField() {
    return cy.getByDataQa('article-about');
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body');
  }

  get articleTagField() {
    return cy.getByDataQa('article-tag').eq(0);
  }

  get publishBtn() {
    return cy.getByDataQa('publish-btn');
  }

  typeTitle(title) {
    this.articleTitleField.type('{selectAll}' + title);
  }
  
  typeAbout(description) {
    this.articleAboutField.type('{selectAll}' + description);
  }

  typeBody(body) {
    this.articleBodyField.type('{selectAll}' + body);
  }

  typeTag(tag) {
    this.articleTagField.type('{selectAll}' + tag);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  assertEmailField(email) {
    this.emailField
      .should('have.value', email);
  }

  get articleInfoBanner() {
    return cy.getByDataQa('article-banner');
  }

  assertArticleInfo(title) {
    this.articleInfoBanner
      .should('contain', title);
  }

  get editBtn() {
    return cy.getByDataQa('edit-article').eq(0);
  }

  get deleteBtn() {
    return cy.getByDataQa('delete-article').eq(0);
  }

  clickEditBtn() {
    this.editBtn.click();
  }

  clickDeleteBtn() {
    this.deleteBtn.click();
  }
}

export default ArticlePageObject;
