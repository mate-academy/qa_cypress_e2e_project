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
