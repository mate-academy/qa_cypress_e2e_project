import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertGlobalFeed() {
    // eslint-disable-next-line max-len
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  }
}

export default HomePageObject;
