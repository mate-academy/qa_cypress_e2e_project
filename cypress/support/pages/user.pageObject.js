import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataCy('follow-user');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-user');
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