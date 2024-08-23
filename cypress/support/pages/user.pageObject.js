import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#';

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-btn');
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  get userArticle() {
    return cy.getByDataQa('user-article');
  }

  get userFeed() {
    return cy.getByDataQa('Your Feed');
  }

  clickUserFeed() {
    this.userFeed.click();
  }

  clickUserArticle() {
    this.userArticle.click();
  }

  clickOnFollowBtn() {
    this.followBtn.click();
  }

  clickOnUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertLoginFailedMessage(message) {
    this.failMessage
      .should('contain', message);
  }
}

export default UserPageObject;
