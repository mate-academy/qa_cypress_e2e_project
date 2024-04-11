import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-btn');
  }

  clickFollowUserBtn() {
    this.followBtn.click();
  }

  clickUnfollowUserBtn() {
    this.unfollowBtn.click();
  }

  assertUnfollowBtnExist() {
    this.unfollowBtn.should('exist');
  }

  assertFollowBtnExist() {
    this.followBtn.should('be.visible');
  }
}

export default UserPageObject;