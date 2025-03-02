import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get yourFeedLink() {
    return cy.getByDataCy('your-feed-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderHasNoUsernameLink() {
    cy.contains('[data-cy="username-link"]')
      .should('not.exist');
  }

  clickOnYourFeedLink() {
    this.yourFeedLink
      .click();
  }
}

export default HomePageObject;
