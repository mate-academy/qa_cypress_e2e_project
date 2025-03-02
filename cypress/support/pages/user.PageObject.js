import PageObject from "../PageObject";

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  get followBtn() {
    return cy.getByDataCy('follow-unfollow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataCy('follow-unfollow-btn');
  }

  assertCanFollowUser() {
    this.followBtn.should('exist');
  }

  assertFollowingUser(username) {
    this.unfollowBtn.should('exist');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }
}

export default UserPageObject;
