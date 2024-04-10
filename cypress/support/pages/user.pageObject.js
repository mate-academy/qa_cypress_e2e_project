import PageObject from '../PageObject';

class UserPagePageObject extends PageObject {
  url = `/#/`;

  clickFollowBtn(username) {
    cy.contains('.btn', `Follow ${username}`).click();
  }

  clickUnfollowBtn(username) {
    cy.contains('.btn', `Unfollow ${username}`).click();
  }

  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  assertFollowBtn(username) {
    cy.get('.btn').should('be.visible', `Follow ${username}`);
  }

  assertUnfollowBtn(username) {
    cy.get('.btn').should('be.visible', `Follow ${username}`);
  }
}

export default UserPagePageObject;
