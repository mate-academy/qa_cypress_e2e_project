import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  checkNoArticlesVisible() {
    cy.getByDataCy('no-articles')
      .should('be.visible');
  }

  get globalfeedLink() {
    return cy.getByDataCy('global-feed-link');
  }

  assertUsernameLink(username) {
    this.usernameLink.should('contain', username);
  }

  assertLogOutHomePage() {
    cy.getByDataCy('sign-in-link')
      .should('be.visible');
    cy.getByDataCy('sign-up-link')
      .should('be.visible');
  }
}

export default HomePageObject;
