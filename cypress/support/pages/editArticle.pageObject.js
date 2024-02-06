import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/article';

  get articlePage() {
    return cy.getByDataQa('article-page');
  }

  get articleEditBtn() {
    return cy.getByDataQa('article-edit-btn');
  }

  get articleDeleteBtn() {
    return cy.getByDataQa('article-delete-btn');
  }

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  clickEditBtn() {
    this.articleEditBtn.eq(1).click();
  }

  clickDeleteBtn() {
    this.articleDeleteBtn.eq(1).click();
  }

  assertTitle(title) {
    this.articleTitle
      .should('contain', title);
  }

  assertBody(body) {
    this.articleBody
      .should('contain', body);
  }

  assertTitleAbsence(title) {
    this.articleTitle
      .should('not.contain', title);
  }
}

export default EditArticlePageObject;
