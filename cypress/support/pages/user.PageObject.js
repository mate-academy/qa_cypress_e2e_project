import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  clickFollowBtn() {
    this.followBtn
      .click();
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-btn');
  }

  clickUnfollowBtn() {
    this.unfollowBtn
      .click();
  }

  assertSuccessfulFollowUser(username) {
    this.unfollowBtn
      .should('be.visible')
      .and('contain', `Unfollow ${username}`);
  }

  assertSuccessfulUnfollowUser(username) {
    this.followBtn
      .should('be.visible')
      .and('contain', `Follow ${username}`);
  }
}

export default UserPageObject;
