import PageObject from '../PageObject';

class ArticleEditPageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.getByDataCy('article/title')
      .clear()
      .type(title);
  }

  typeDescription(desc) {
    cy.getByDataCy('article/description')
      .type(desc);
  }

  typeBody(body) {
    cy.getByDataCy('article/body')
      .type(body);
  }

  clickOnPublish() {
    cy.getByDataCy('article/publishBtn')
      .click();
  }

  clickOnEditBtn() {
    cy.getByDataCy('article/editBtn')
      .first().click();
  }

  clickOnDeleteBtn() {
    cy.getByDataCy('article/deleteBtn')
      .first().click()
  }
}

export default ArticleEditPageObject;