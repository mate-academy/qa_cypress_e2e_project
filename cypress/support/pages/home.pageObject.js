import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get homeLink() {
    return cy.getByDataCy('home-link')
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link')
  }
  get signUpLink() {
    return cy.getByDataCy('sign-up-link')
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHomeLink() {
    this.homeLink
    .should('be.visible')
    .should('contain','Home');
  }

  assertSignUpLink() {
    this.signUpLink
    .should('be.visible')
    .should('contain','Sign up');
  }

  assertSigninLink() {
    this.signInLink
    .should('be.visible')
    .should('contain','Sign in');
  }
}

export default HomePageObject;
