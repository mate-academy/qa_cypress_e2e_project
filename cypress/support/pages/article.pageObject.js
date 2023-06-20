import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles';

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get editArticleBtn() {
    return cy.getByDataCy('editBtn');
  }

  clickOnEditBtn() {
    cy.getByDataCy('editBtn').first().click();
  }

  clickOnDeleteBtn() {
    cy.getByDataCy('deleteBtn').first().click();
  }
}

export default ArticlePageObject;
