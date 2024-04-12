import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get homePageUrl() {
    return cy.url();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHomePageUrl () {
    this.homePageUrl.should('eq', 'http://localhost:1667/#/');
  }
}

export default HomePageObject;
