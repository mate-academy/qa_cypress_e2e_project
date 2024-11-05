import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }

  get newArticleLink() {
    return cy.getByDataCy('new-article-link');
  }

  get homePageUrl() {
    return cy.url();
  }

  get followBtn() {
    return cy.getByDataCy('follow-user-btn')
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickOnSettingsLink() {
    this.settingsLink
      .click();
  }

  clickOnNewArticleLink(){
    this.newArticleLink
      .click();
  }
  verifyUrl() {
    this.homePageUrl
      .should('equal', url);
  }

  clickOnFollowBtn() {
    this.followBtn
      .click();
  }

  verifyFollow() {
    this.followBtn
      .should('contain', 'Unfollow');
  }
  verifyUnfollow() {
    this.followBtn
      .should('contain', 'Follow');
  }
}

export default HomePageObject;
