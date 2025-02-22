import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get homeLink() {
    return cy.getByDataCy('home');
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings');
  }

  get newArticleLink() {
    return cy.getByDataCy('new-article');
  }

  get yourFeed() {
    return cy.getByDataCy('your-feed');
  }

  get globalFeed() {
    return cy.getByDataCy('global-feed');
  }

  get articlePreview() {
    return cy.getByDataCy('article-preview');
  }

  pressYourFeed() {
    this.yourFeed.click();
  }

  pressGlobalFeed() {
    this.globalFeed.click();
  }

  pressHomeLink() {
    this.homeLink.click();
  }

  pressSettingsLink() {
    this.settingsLink.click();
  }

  pressNewArticleLink() {
    this.newArticleLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
