import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  clickOnFollowBtn(username) {
    cy.contains('button', `Follow ${username}`).click();
  }

  clickOnUnfollowBtn(username) {
    cy.contains('button', `Unfollow ${username}`).click();
  }

  assertUsernameToFollow(username) {
    cy.get('h4').should('contain', username);
  }

  assertFollowing(username) {
    cy.contains('button', `Unfollow ${username}`).should('exist');
  }

  assertUnfollowing(username) {
    cy.contains('button', `Follow ${username}`).should('exist');
  }
};

export default UserPageObject;
