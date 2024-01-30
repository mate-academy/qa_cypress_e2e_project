import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get signInLink() {
    return cy.getByDataCy('header-sign-in')
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignIn() {
    this.signInLink.should('contain', 'Sign in');
  }
}

export default HomePageObject;
