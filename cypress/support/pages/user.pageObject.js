import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visit(username) {
    cy.visit(`/#/@${username}`);
  }

  clickFollowBtn(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }

  clickUnfollowBtn(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  assertFollowingUser(username) {
    cy.contains('button', `Unfollow ${username}`).should('exist');
  }
};

export default UserPageObject;
