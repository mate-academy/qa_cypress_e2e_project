import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {
  url = '/#/articles'

  assertTitle(title) {
    cy.getByDataQa('banner-articles')
      .find('h1')
      .should('contain', title);
  }

  clickEditBtn() {
    cy.getByDataQa('edit-article-btn')
      .eq(0)
      .click();
  }

  clickDeleteBtn() {
    cy.getByDataQa('delete-article-btn')
      .eq(0)
      .click();
  }
};

export default ArticlePageObject;