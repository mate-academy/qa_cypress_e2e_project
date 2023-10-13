import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataQa('follow-user');
  }

  get unfollowBtn() {
    return cy.get('unfollow-user');
  }

  clickFollowUserBtn() {
    this.followBtn.click();
  }

  clickUnfollowUserBtn() {
    this.unfollowBtn.click();
  }

  visitFollowedUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  assertUnfollowBtnExist() {
    this.unfollowBtn
      .should('exist');
  }

  assertFollowBtnExist() {
    this.followBtn
      .should('exist');
  }
}

export default UserPageObject;