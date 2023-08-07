import PageObject from '../PageObject';

class UserPagePageObject extends PageObject {
  url = `/#/`;

  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  followBtn(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }

  unfollowBtn(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  assertFollowBtn(username) {
    cy.get('.btn').should('be.visible', `Follow ${username}`);
  }

  assertUnfollowBtn(username) {
    cy.get('.btn').should('be.visible', `Follow ${username}`);
  }
}

export default UserPagePageObject;
