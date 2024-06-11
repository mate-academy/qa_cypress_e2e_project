import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link').click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticleDeletion() {
    cy.get('.article-preview').should('contain',
      'No articles are here... yet.');
  }
}

export default HomePageObject;
