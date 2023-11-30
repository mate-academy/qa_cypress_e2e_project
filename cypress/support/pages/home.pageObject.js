import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get conduitLink() {
    return cy.getByDataQa('conduit-link');
  }

  get homeLink() {
    return cy.getByDataQa('home-link');
  }

  get signInLink() {
    return cy.getByDataQa('sign-in-link');
  }

  get signUpLink() {
    return cy.getByDataQa('sign-up-link');
  }

  get newArticaleLink() {
    return cy.getByDataQa('new-articale-link');
  }

  get settingsLink() {
    return cy.getByDataQa('settings-link');
  }

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  clickHome() {
    this.homeLink.click();
  }

  clickSignUp() {
    this.signUpLink.click();
  }

  clickSignIn() {
    this.signInLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }

  assertLogOut() {
    cy.url().should('include', '/#/');
  }

  assertDeleteArticle() {
    cy.url().should('include', '/#/');
  }
}

export default HomePageObject;
