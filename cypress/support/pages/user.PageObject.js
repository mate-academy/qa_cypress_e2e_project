import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}`);
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-btn');
  }

  get userProfileInfo() {
    return cy.getByDataCy('user-profile-info');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertCanFollowUser() {
    this.followBtn
      .should('exist');
  }

  assertFollowingUser(username) {
    this.unfollowBtn
      .should('contain', `Unfollow ${username}`);
  }

  assertUnfollowingUser(username) {
    this.followBtn
      .should('contain', `Follow ${username}`);
  }
}

export default UserPageObject;
