import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get articlePreview() {
    return cy.get('.article-preview');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }

  assertArticleDeleted() {
    this.articlePreview.should('contain.text', 'No articles are here... yet.');
  }
}

export default HomePageObject;
