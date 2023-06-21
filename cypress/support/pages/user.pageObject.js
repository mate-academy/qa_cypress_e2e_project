import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  clickFollowBtn() {
    cy.getByDataQA('follow-user-btn').click();
  }

  clickUnfollowBtn() {
    cy.getByDataQA('unfollow-user-btn').click();
  }

  checkSuccessfulFollowUser(username) {
    cy.getByDataQA('unfollow-user-btn').should('be.visible')
      .and('contain', `Unfollow ${username}`);
  }

  checkSuccessfulUnfollowUser(username) {
    cy.getByDataQA('follow-user-btn').should('be.visible')
      .and('contain', `Follow ${username}`);
  }
}

export default UserPageObject;
