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
    cy.contains('.btn', `Unfollow ${username}`).should('exist');
  }

  assertUnfollowingUser(username) {
    cy.contains('.btn', `Follow ${username}`).should('exist');
  }
};

export default UserPageObject;
