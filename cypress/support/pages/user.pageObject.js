import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/@';

  visitUserUrl(username) {
    cy.visit(`${this.url}${username}`);
  }

  get username() {
    return cy.get('h4');
  };

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  assertFollowBtnContainText(text) {
    this.followBtn
      .should('contain.text', `${text}`);
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-btn');
  }

  assertUnfollowBtnContainText(text) {
    this.unfollowBtn
      .should('contain.text', `${text}`);
  }

  assertUsernameContainText(text) {
    this.username
      .should('contain.text', `${text}`);
  }

  clickFollowUserBtn() {
    this.followBtn
      .click();
  }
}

export default UserPageObject;
