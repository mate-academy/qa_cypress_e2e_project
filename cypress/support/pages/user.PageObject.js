import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  clickFollowBtn() {
    cy.getByDataQa('follow-btn').click();
  }

  clickUnfollowBtn() {
    cy.getByDataQa('unfollow-btn').click();
  }

  assertSuccessfulFollowUser(username) {
    cy.getByDataQa('unfollow-btn').should('be.visible')
      .and('contain', `Unfollow ${username}`);
  }

  assertSuccessfulUnfollowUser(username) {
    cy.getByDataQa('follow-btn').should('be.visible')
      .and('contain', `Follow ${username}`);
  }
}

export default UserPageObject;
