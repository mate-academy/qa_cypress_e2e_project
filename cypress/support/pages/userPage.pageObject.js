import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.get('follow-user-btn');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-user-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertCanFollowUser() {
    this.followBtn.should('exist');
  }

  assertCanUnfollowUser() {
    this.unfollowBtn.should('exist');
  }
}

export default UserPageObject;
