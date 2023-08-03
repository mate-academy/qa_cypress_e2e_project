import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles/';

  assertArticleTitle(title) {
    cy.get('h1')
      .should('be.visible', title);
  }

  assertArticleBody(body) {
    cy.get('p')
      .should('be.visible', body);
  }

  clickOnTheEditBtn() {
    cy.contains('.btn', 'Edit Article')
      .click();
  }

  clickOnTheDeleteBtn() {
    cy.contains('button', 'Delete Article')
      .click();
  }
}

export default ArticlePageObject;
