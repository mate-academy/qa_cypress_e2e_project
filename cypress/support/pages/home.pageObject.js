import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = 'http://localhost:1667/';

  get usernameLink() {
    return cy.findByTestID('profile-nav');
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
