import PageObject from '../PageObject';

class ArticlesPageObject extends PageObject {
  url = '/#/articles/';

  get articleTitle() {
    return cy.get('h1');
  }

  clickOnEditBtn() {
    // cy.getByDataCy('editBtn')
    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-secondary')
      .first()
      .click();
  }

  clickOnDeleteBtn() {
    // cy.getByDataCy('deleteBtn')
    cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-danger')
      .first()
      .click();
  }
}

export default ArticlesPageObject;
