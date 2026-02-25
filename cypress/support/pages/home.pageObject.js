import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  get articleTitles() {
    return cy.getByDataCy('home-article-title');
  }

  get globalFeedLink() {
    return cy.getByDataCy('home-global-feed');
  }

  get yourFeedLink() {
    return cy.getByDataCy('home-your-feed');
  }

  clickUsernameLink() {
    this.usernameLink
      .click();
  }

  clickSettingsLink() {
    this.settingsLink
      .click();
  }

  clickGlobalFeedLink() {
    this.globalFeedLink
      .click();
  }

  clickYourFeedLink() {
    this.yourFeedLink
      .click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertUsernameLinkNotExist() {
    return this.usernameLink.should('not.exist');
  }

  assertArtListNotContainArticleTitle(artTitle) {
    this.articleTitles
      .should((els) => {
        const texts = [...els].map((el) => el.textContent);
        expect(texts).to.not.include(artTitle);
      }); ;
  }
}

export default HomePageObject;
