import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.get('[data-qa="follow-btn"]');
  }

  get unfollowBtn() {
    return cy.get('[data-qa="unfollow-btn"]');
  }

  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  clickOnFollowBtn() {
    this.followBtn
      .click();
  }

  clickOnUnfollowBtn() {
    this.unfollowBtn
      .click();
  }

  assertUserIsFollowed() {
    this.followBtn
      .should('contain', 'Unfollow');
  }

  assertUserIsUnfollowed() {
    this.unfollowBtn
      .should('contain', 'Follow');
  }
}

export default UserPageObject;
