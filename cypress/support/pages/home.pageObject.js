import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get signUpLink() {
    return cy.getByDataQa('sign-up-link');
  }

  get signInLink() {
    return cy.getByDataQa('sign-in-link');
  }

  assertUrl() {
    cy.url().should('eq', 'http://localhost:1667' + this.url);
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
