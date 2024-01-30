import PageObject from '../PageObject';
class HomePageObject extends PageObject {
  url = '/#/';
  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get authorName() {
    return cy.getByDataCy('author-name-home-page');
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-btn');
  }

  clickOnProfileLink() {
    this.usernameLink
      .click();
  }

  clickOnAuthor() {
    this.authorName
      .click();
  }

  clickOnFollowBtn() {
    this.followBtn
      .click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn
      .click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.usernameLink.should('not.exist', username);
  }

  assertBtnName(text) {
    this.followBtn
      .should('include.text', text);
  }
}

export default HomePageObject;
