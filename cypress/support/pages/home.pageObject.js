import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get headerSignUpBtn() {
    return cy.getByDataCy('header-sign-up-btn');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderContainSignUpBtn() {
    this.headerSignUpBtn
      .should('contain', 'Sign up');
  }

  clickHeaderSignUpBtn() {
    this.headerSignUpBtn
      .click();
  }
}

export default HomePageObject;
