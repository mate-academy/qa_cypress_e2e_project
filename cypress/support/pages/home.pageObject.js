import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = 'http://localhost:1667/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }
}

export default HomePageObject;
