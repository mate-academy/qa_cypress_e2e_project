import PageObject from '../PageObject';

class ArticlesPageObject extends PageObject {
  url = '/#/articles/';

  get articleTitle() {
    return cy.get('h1');
  }

  clickOnEditBtn() {
    cy.contains('.btn', 'Edit Article')
      .click();
  }

  clickOnDeleteBtn() {
    cy.contains('.btn', 'Delete Article')
      .click();
  }
}

export default ArticlesPageObject;
