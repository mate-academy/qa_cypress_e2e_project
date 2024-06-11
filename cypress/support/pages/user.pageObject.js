import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/@';

  visitUserUrl(username) {
    cy.visit(`${this.url}${username}`);
  }

  get followButton() {
    return cy.getByDataCy('follow-btn');
  }

  get unfollowButton() {
    return cy.getByDataCy('unfollow-btn');
  }

  follow() {
    this.followButton.click();
  }

  unfollow() {
    this.unfollowButton.click();
  }

  assertFollowing() {
    this.unfollowButton.should('be.visible');
  }

  assertNotFollowing() {
    this.followButton.should('be.visible');
  }
}

export default UserPageObject;
