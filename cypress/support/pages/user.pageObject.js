import PageObject from '../PageObject';

class UserPageObject extends PageObject {
    url = '/#/editor';

  get followButton() {
    return cy.getByDataCy('follow-btn');
  }

  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  clickOnFollowButton() {
    this.followButton
      .click();
  }

  checkSuccessFollowed(username) {
    this.followButton
      .should('contain', 'Unfollow ' + username);
  }
}

export default UserPageObject;