import PageObject from '../PageObject';

class FollowPageObject extends PageObject {
  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollowBtn() {
    this.followBtn
      .click();
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-btn');
  }

  clickUnfollowBtn() {
    this.unfollowBtn
      .click();
  }
}

export default FollowPageObject;
