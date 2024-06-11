import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  assertHomePageUrl() {
    cy.url()
      .should('eq', 'http://localhost:1667/#/');
  }

  assertUsernameLink(username) {
    cy.get('a').should('contain', username);
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  clickOntheSignUpLink() {
    cy.getByDataCy('signUpLink').click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  registeredUser(email, username, password) {
    cy.login(email, username, password);
  }
}

export default HomePageObject;
