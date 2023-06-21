import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/@';

  visitFollowedUser(username) {
    cy.visit(`${this.url}${username}`);
  }

  get followBtn() {
    return cy.getByDataQa('follow-user-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  assertFollowBtn(username) {
    this.unFollowBtn.should('contain', `Follow ${username}`);
  }

  get unFollowBtn() {
    return cy.getByDataQa('unfollow-user-btn');
  }

  clickUnFollowBtn() {
    this.unFollowBtn.click();
  }

  assertUnfollowBtn(username) {
    this.unFollowBtn.should('contain', `Unfollow ${username}`);
  }
}

export default UserPageObject;
