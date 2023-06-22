import PageObject from '../PageObject';

class userProfilePageObject extends PageObject {

  visitUserProfile(username) {
    cy.visit(`#/@${username}/`);
  }

  get followUserBtn() {
    return cy.getByDataCy('follow-user-btn');
  }

  clickFollowUser() {
    this.followUserBtn
     .first()
     .click();
  }

  get unfollowUserBtn() {
    return cy.getByDataCy('unfollow-user-btn');
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

export default userProfilePageObject;