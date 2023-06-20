import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  assertDeletingArticle(title) {
    cy.getByDataQa('article-list-global-feed').should('not.have.value', title);
    cy.getByDataQa('article-list-global-feed').should('contain', 'No articles are here... yet.');
  }

  get settingsLink() {
    return cy.getByDataQa('settings-link');
  }

  assertSuccessfulLogin(username) {
    cy.getByDataQa('username-link').should('contain', username);
  }
}

export default HomePageObject;
