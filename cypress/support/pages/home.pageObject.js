import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get yourFeedLink() {
    return cy.getByDataCy('your-feed');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHomepage() {
    cy.url().should('eq', 'http://localhost:1667/#/');
  }

  clickyourFeedLink() {
    this.yourFeedLink.click();
  }

  assertFollowed(user) {
    this.yourFeedLink.should('contain', user);
  }
}

export default HomePageObject;
