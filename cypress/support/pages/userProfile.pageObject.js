import PageObject from '../PageObject';

class UserProfilePageObject extends PageObject {
  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-btn');
  }

  get followingStatus() {
    return cy.getByDataCy('following-status');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertFollowingText(text) {
    cy.contains(text).should('be.visible');
  }
}

export default UserProfilePageObject;
