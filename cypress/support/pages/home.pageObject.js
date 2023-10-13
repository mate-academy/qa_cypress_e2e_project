import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get articleDeleted() {
    return cy.getByDataCy('check-article');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticleDeleted(text) {
    this.articleDeleted
      .should('contain', text);
  }

  assertUserLoggedOut(username) {
    this.usernameLink
     .should('not.exist');
  }
}

export default HomePageObject;
