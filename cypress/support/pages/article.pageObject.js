import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles/';

  checkArticleTitle(title) {
      cy.get('h1')
      .should('contain', title);
  }

  checkArticleBody(body) {
    cy.get('p')
      .should('contain', body);
  }

  clickEditArticle() {
    cy.getByDataQa('edit-article-btn')
      .first() 
      .click();
  }

  clickDeleteActicle() {
    cy.getByDataQa('delete-article-btn')
      .first() 
      .click();
  }
}

export default ArticlePageObject;
