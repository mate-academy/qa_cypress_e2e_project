import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get signInLink() {
    return cy.getByDataQa('sign-in-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignIn() {
    this.signInLink
      .should('contain', 'Sign in');
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }

  assertUrlAfterLogout() {
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');
  }
}

export default HomePageObject;
