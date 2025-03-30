import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get newArticleLink() {
    return cy.getByDataCy('newArticle-link');
  }

  // commands to asserts
  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  // commands to click on buttons
  clickOnNewArticleBtn() {
    this.newArticleLink.click();
  }
}

export default HomePageObject;
