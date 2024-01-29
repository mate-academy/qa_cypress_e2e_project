import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get homeLink () {
    return cy.getByDataCy('home-link');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }

  get signUpLink() {
    return cy.getByDataCy('sign-up-link');
  }

  clickHomeLink() {
    this.homeLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainNewUsername(newUserName) {
    this.usernameLink
      .should('contain', newUserName);
  };

  assertHederContainSignIn(link) {
    this.signInLink.should('be.visible');
  }

  assertHederContainSignUp(link) {
    this.signUpLink.should('be.visible');
  }
}

export default HomePageObject;
