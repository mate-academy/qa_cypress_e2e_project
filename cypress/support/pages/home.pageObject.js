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

  get signInLink() {
    return cy.get('a', 'Sign In');
  }

  get signUpLink() {
    return cy.contains('a', 'Sign Up');
  }

  assertMainPageUrl() {
    cy.url().should('include', '/#/');
  }

  assertMainPageLogo() {
    cy.get('h1').should('contain.text', 'conduit');
  }

  assertMainPageLogoText() {
    cy.get('p').should('contain.text', 'A place to share your knowledge.');
  }
}

export default HomePageObject;
