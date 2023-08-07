import PageObject from '../PageObject';

class CreateArticlePageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.getByDataCy('article-title').type(title);
  }

  clearTitleField() {
    cy.getByDataCy('article-title').clear();
  }

  typeDescription(description) {
    cy.getByDataCy('article-about').type(description);
  }

  clearDescriptionField() {
    cy.getByDataCy('article-about').clear();
  }

  typeBody(body) {
    cy.getByDataCy('article-body').type(body);
  }

  clearBodyField() {
    cy.getByDataCy('article-body').clear();
  }

  typeTag(tag) {
    cy.get('[placeholder="Enter tags"]').type(tag);
  }

  clickPublishArticleBtn() {
    cy.getByDataCy('article-publish-btn').click();
  }

  assertFailedCreatingArticle(message) {
    cy.get('.swal-modal').should('contain', message);
  }
}

export default CreateArticlePageObject;
