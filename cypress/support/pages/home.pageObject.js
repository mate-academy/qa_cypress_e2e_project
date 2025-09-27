import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get navbar() {
    return cy.getByDataCy('navbar');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in');
  }

  get signUpLink() {
    return cy.getByDataCy('sign-up');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  isConduitHomePage() {
    this.navbar.within(() => {
      this.signInLink.should('exist');
      this.signUpLink.should('exist');
    });
  }
}

export default HomePageObject;
