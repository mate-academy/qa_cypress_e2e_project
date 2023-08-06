import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  homePageRedirect() {
    cy.get(':nth-child(1) > .nav-link').click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertHeaderContainUpdateUsername(username) {
    cy.get('[data-cy="username-link"]').should('contain', 'Riootttt');
  }

  assertMainPageUrl() {
    cy.url().should('include', '/#/');
  }

  assertMainPageLogo() {
    cy.get('h1').should('contain.text', 'conduit');
  }

  // eslint-disable-next-line no-dupe-class-members
  assertMainPageLogoText() {
    cy.get('p').should('contain.text', 'A place to share your knowledge.');
  }
}

export default HomePageObject;
