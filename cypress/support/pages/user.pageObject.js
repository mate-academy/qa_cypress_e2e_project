import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  clickFollowButton(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }

  clickUnFollowButton(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  assertUsername(username) {
    cy.get('h4').should('contain', username);
  }

  assertFollowBtn() {
    cy.get('.btn')
      .should('contain', 'Follow');
  }

  assertUnfollowBtn() {
    cy.get('.btn')
      .should('contain', 'Unfollow');
  }
};

export default UserPageObject;
