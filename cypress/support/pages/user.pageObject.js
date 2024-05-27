import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  followBtn() {
    return cy.get('[data-qa="followBtn"]').click();
  }

  unfollowBtn() {
    return cy.get('[data-qa="unFollowBtn"]');
  }

  assertFollowButton() {
    this.followBtn().should('be.visible');
  }

  assertUnfollowButton() {
    this.unfollowBtn().should('be.visible');
  }
}

export default UserPageObject;
