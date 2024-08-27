import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get signInLink () {
    return cy.getByDataQa('sign-in-link');
  }

  checkSignInLink() {
    this.signInLink.should('be.visible');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
