import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get header() {
    return cy.getByDataQa('header');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get clickOnUsernameLink() {
    return this. usernameLink.click();
  }

  get articlePreview() {
    return cy.getByDataQa('article-preview');
  }
}

export default HomePageObject;
