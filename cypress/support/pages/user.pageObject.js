import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  followButton(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }

  unfollowButton(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  checkUserPage(username) {
    cy.get('h4').should('contain', username);
  }

  checkUnfollowButton(username) {
    cy.contains('.btn', `Unfollow ${username}`).should('be.visible');
  }

  checkFollowButton(username) {
    cy.contains('.btn', `Follow ${username}`).should('be.visible');
  }
};

export default UserPageObject;
