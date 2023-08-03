import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get signInLink() {
    return cy.get('a', 'Sign In');
  }

  get signUpLink() {
    return cy.contains('a', 'Sign Up');
  }
}

export default HomePageObject;
