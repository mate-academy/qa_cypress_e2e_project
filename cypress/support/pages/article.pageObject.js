import PageObject from '../PageObject';

class ArticlesPageObject extends PageObject {
  url = '/#/articles/';

  get articleTitle() {
    return cy.get('h1');
  }

  clickOnEditBtn() {
    // cy.getByDataCy('editBtn')
    return cy.contains('.btn', 'Edit Article')
      .click();
  }

  clickOnDeleteBtn() {
    // cy.getByDataCy('deleteBtn')
    return cy.contains('.btn', 'Delete Article')
      .click();
  }
}

export default ArticlesPageObject;
