import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visit(username) {
    cy.visit(`/#/@${username}`);
  }

  followButton(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }

  unFollowButton(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  assertUsername(username) {
    cy.get('h4').should('contain', username);
  }
};

export default UserPageObject;
