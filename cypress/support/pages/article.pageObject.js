import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles/';

  clickOnEditBtn() {
    cy.contains('a', 'Edit Article').click();
  }

  clickOnDeleteBtn() {
    cy.contains('button', 'Delete Article').click();
  }
}

export default ArticlePageObject;
