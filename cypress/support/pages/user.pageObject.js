import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataQa('follow-user-btn');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-user-btn');
  }

  clickFollowBtn() {
    this.followBtn
      .click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn
      .click();
  }

  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  assertFollowedUser() {
    this.unfollowBtn
      .should('contain', 'Unfollow');
  }

  assertUnfollowedUser() {
    this.followBtn
      .should('contain', 'Follow');
  }
}

export default UserPageObject;