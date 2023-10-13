import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollowUser() {
    this.followBtn.click();
  }

  toUserProfile() {
    cy.visit('http://localhost:1667/#/@forTesting');
  }

  assertUnfollowBtn() {
    this.followBtn.should('contain', 'Unfollow');
  }
}

export default UserPageObject;
