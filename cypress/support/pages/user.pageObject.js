import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/editor';

  get followBtn () {
    return cy.getByDataCy('follow-button');
  }

  get yourFeedLink() {
    return cy.getByDataCy('your-feed-link');
  }

  get usernameLink () {
    return cy.getByDataCy('author-username-link');
  };

  get unfollowBtn () {
    return cy.getByDataCy('unfollow-button');
  };

  get articleTitleLink() {
    return cy.get('h1');
  }

  assertFollowUser() {
    this.unfollowBtn.should('be.visible');
    this.followBtn.should('contain', 'Unfollow');
  }

  clickAricleTitleLink() {
    this.articleTitleLink.click();
  }

  clickYourFeedLink() {
    this.yourFeedLink.click();
  }

  clickAuthorLink() {
    this.usernameLink.click();
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }
};
export default UserPageObject;
