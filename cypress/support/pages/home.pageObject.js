import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickUsernameLink() {
    this.usernameLink.click();
  }

  get homePageUrl() {
    return cy.url();
  }

  assertHomePageUrl() {
    this.homePageUrl
      .should('include', '/#/');
  }

  get clickableTitle() {
    return cy.getByDataQa('clickable-title');
  }

  clickClickableTitle() {
    this.clickableTitle.click();
  }
}

export default HomePageObject;
