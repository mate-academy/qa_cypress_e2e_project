import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}`);
  }

  get followBtn() {
    return cy.contains('button', 'Follow');
  }

  get unfollowBtn() {
    return cy.contains('button', 'Unfollow');
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

  assertFollowingUser() {
    this.unfollowBtn
      .should('contain', `Follow`);
  }

  assertUnfollowingUser() {
    this.followBtn
      .should('contain', `Unfollow`);
  }
}

export default UserPageObject;
