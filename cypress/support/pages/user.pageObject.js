import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  followBtn() {
    return cy.get('[data-cy="follow-btn"]');
  }

  unfollowBtn() {
    return cy.get('[data-cy="unfollow-btn"]');
  }

  assertFollowButtonVisible() {
    this.followBtn().should('be.visible');
  }

  assertUnfollowButtonVisible() {
    this.unfollowBtn().should('be.visible');
  }
}

export default UserPageObject;
