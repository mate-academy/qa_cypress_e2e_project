import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.getByDataQa('article-title')
      .clear()
      .type(title);
  }

  typeDescription(desc) {
    cy.getByDataQa('article-description')
      .type(desc);
  }

  typeBody(body) {
    cy.getByDataQa('article-body')
      .type(body);
  }

  clickOnPublish() {
    cy.getByDataQa('article-publishButton')
      .click();
  }

  clickOnEditBtn() {
    cy.getByDataQa('article-editButton')
      .first().click();
  }

  clickOnDeleteBtn() {
    cy.getByDataCy('article-deleteButton')
      .first().click()
  }
}

export default ArticlePageObject;