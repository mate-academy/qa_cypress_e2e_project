import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get settingsLink() {
    return cy.getByDataCy('settingsLink');
  }

  clickOnSettingsLink() {
    this.settingsLink.click();
  }

  get newArticleLink() {
    return cy.getByDataCy('newArticleLink');
  }

  clickOnnewArticleLink() {
    this.newArticleLink.click();
  }

  get globalFeed() {
    return cy.get('.home-global');
  }

  assertArticleDoesNotExist(title) {
    this.globalFeed.should('not.contain', title);
  }
}

export default HomePageObject;
