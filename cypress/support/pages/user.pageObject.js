import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-btn');
  }

  clickFollowUserBtn() {
    this.followBtn.click();
  }

  clickUnfollowUserBtn() {
    this.unfollowBtn.click();
  }

  visitFollowedUserPage(username) {
    cy.visit(`/@${username}`);
  }

  assertUnfollowBtnExist() {
    this.unfollowBtn
      .should('exist');
  }

  assertFollowBtnExist() {
    this.followBtn
      .should('be.visible');
  }
}

export default UserPageObject;
