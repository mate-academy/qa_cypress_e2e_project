import PageObject from '../PageObject';

class ArticlesPageObject extends PageObject {
  url = '/#/articles/';

  get articleTitle() {
    return cy.get('h1');
  }

  clickOnEditBtn() {
    cy.getByDataCy('editBtn')
      .first()
      .click();
  }

  clickOnDeleteBtn() {
    cy.getByDataCy('deleteBtn')
      .first()
      .click();
  }
}

export default ArticlesPageObject;
