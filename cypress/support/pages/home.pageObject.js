import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get nameSignInLink() {
    return 'Sign in';
  }
  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-btn');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertHeaderContainSignIn() {
    this.signInLink.should('contain', this.nameSignInLink);
  }
}

export default HomePageObject;
