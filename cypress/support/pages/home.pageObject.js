import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertDeletingArticle(title) {
    cy.getByDataCy('article-list-global-feed').should('not.have.value', title);
    cy.getByDataCy('article-list-global-feed').should('contain', 'No articles are here... yet.');
  }
}

export default HomePageObject;
