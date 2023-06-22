import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles'

  assertArticleData(title, body, username) {
    cy.getByDataCy('article-title')
      .should('contain', title);
    cy.getByDataCy('article-body')
      .should('contain', body);
    cy.getByDataCy('username-link')
      .should('contain', username);
  }

  clickEditButton() {
    cy.getByDataCy('edit-article-button')
      .eq(1)
      .click();
  }

  clickDeleteButton() {
    cy.getByDataCy('delete-article-button')
      .eq(1)
      .click({ force: true });
  }
};

export default ArticlePageObject;
