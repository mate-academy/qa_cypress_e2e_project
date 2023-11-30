import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get logInBtn() {
    return cy.getByDataQa('login-btn');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickLogInBtn() {
    this.logInBtn.click();
  }

  assertUserIsNotLoggedIn() {
    this.usernameLink
      .should('not.exist');
  }
}

export default HomePageObject;
