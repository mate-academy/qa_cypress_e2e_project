import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#';

  get followBtn() {
    return cy.contains('button', 'Follow');
  }

  get unFollowBtn() {
    return cy.contains('button', 'Unfollow');
  }

  clickFollowBtn() {
    this.followBtn
      .click();
  }

  clickUnFollowBtn() {
    this.unFollowBtn
      .click();
  }

  visitFollowedUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  assertUnfollowBtnExist() {
    this.unFollowBtn
      .should('be.visible');
  }

  assertFollowBtnExist() {
    this.followBtn
      .should('be.visible');
  }
}

export default UserPageObject;
