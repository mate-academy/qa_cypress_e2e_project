import PageObject from '../PageObject';

class UserProfilePageObject extends PageObject {

  get followUserBtn() {
    return cy.getByDataQa('follow-user-btn');
  }

  clickFollowUser() {
    this.followUserBtn
      .click();
  }

  get unfollowUserBtn() {
    return cy.getByDataQa('unfollow-user-btn');
  }

  clickUnfollowUser() {
    this.unfollowUserBtn
      .click();
  }

  checkFollowing() {
    this.unfollowUserBtn
      .should('exist')
  }

  checkUnfollowing() {
    this.followUserBtn
      .should('exist')
  }
}

export default UserProfilePageObject;
