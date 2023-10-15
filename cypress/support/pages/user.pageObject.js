import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataQa('follow-user');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-user');
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
      .should('be.visible');
  }

  assertFollowBtnExist() {
    this.followBtn
      .should('be.visible');
  }
}

export default UserPageObject;