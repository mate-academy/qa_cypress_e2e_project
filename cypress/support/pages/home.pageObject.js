import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get headerBar() {
    return cy.getByDataCy('headerBar');
  }

  get checkArticle() {
    return cy.getByDataCy('checkArticle');
  }

  get checkBody() {
    return cy.getByDataCy('checkBody');
  }

  get checkArticleIsDeleted() {
    return cy.getByDataCy('checkArticleIsDeleted');
  }

  get anotherUser() {
    return cy.getByDataCy('anotherUser').first();
  }

  get followBtn() {
    return cy.getByDataCy('followBtn');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollowBtn');
  }

  get yourFeedLink() {
    return cy.getByDataCy('yourFeedLink');
  }

  get settingsLink() {
    return cy.getByDataCy('settingsLink');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderDoesntContainUsername(username) {
    this.headerBar
      .should('not.contain', username);
  }

  assertArticleIsCreated(title) {
    this.checkArticle
      .should('contain', title);
  }

  assertUpdatedArticleTitle(title) {
    this.checkArticle.should('contain', title);
  }

  assertUpdatedBody(body) {
    this.checkBody.should('contain', body);
  }

  assertArticleIsDeleted(title) {
    this.checkArticleIsDeleted.should('not.contain', title);
  }

  assertUnfollowBtn() {
    this.unfollowBtn.should('be.visible');
  }

  assertSettingsLink() {
    this.settingsLink.should('be.visible');
  }

  clickTheAnotherUser() {
    this.anotherUser.click();
  }

  clickTheFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  clickTheSettings() {
    this.settingsLink.click();
  }

  clickTheYourFeedLink() {
    this.yourFeedLink.click();
  }
}

export default HomePageObject;
