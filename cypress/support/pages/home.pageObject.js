import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  clickUsernameLink() {
    this.usernameLink
      .click();
  }

  assetrNewUsername(newUsername) {
    this.usernameLink
      .should('contain', newUsername);
  }

  assertDeletingArticle(title) {
    cy.getByDataQa('article-list-your-feed').should('not.have.value', title);
    cy.getByDataQa('article-list-your-feed').should('contain', 'No articles are here... yet.');
  }

  get settingsLink() {
    return cy.getByDataQa('settings-link');
  }

  assertSuccessfulLogin(username) {
    this.usernameLink
      .should('contain', username);
  }

  get signInLink() {
    return cy.getByDataQa('sign-in-link');
  }
}

export default HomePageObject;
