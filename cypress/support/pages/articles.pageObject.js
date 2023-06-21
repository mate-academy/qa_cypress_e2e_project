import PageObject from '../PageObject';

class ArticlesPageObject extends PageObject {
  url = '/#/articles/';

  get articleTitle() {
    return cy.get('h1');
  }

  clickOnEditBtn() {
    cy.getByDataQA('edit-article-btn')
      .first()
      .click();
  }

  clickOnDeleteBtn() {
    cy.getByDataQA('delete-article-btn')
      .first()
      .click();
  }
}

export default ArticlesPageObject;
