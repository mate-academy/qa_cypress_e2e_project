import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  assertUsernameLink(username) {
    cy.getByDataCy('username-link')
      .should('contain', username);
  }

  loggedUser() {
    cy.login();
  }

  assertDeletingArticle() {
    cy.getByDataCy('home-page-article-list')
      .should('contain', 'No articles are here... yet.');
    cy.url()
      .should('eq', 'http://localhost:1667/#/');
  }

  assertHomePageUrl() {
    cy.url()
      .should('eq', 'http://localhost:1667/#/');
  }

  clearDatabase() {
    cy.task('db:clear');
  }
}

export default HomePageObject;
