import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  get usernameLink() {
    return cy.getByDataQa('header-user-link');
  }

  get signUpLink() {
    return cy.getByDataQa('nav-signup');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  visit() {
    cy.visit('/');
  }
}

export default HomePageObject;
