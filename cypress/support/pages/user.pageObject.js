import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  clickFollowBtn() {
    cy.getByDataCy('follow-user-btn').click();
  }

  clickUnfollowBtn() {
    cy.getByDataCy('unfollow-user-btn').click();
  }

  assertFollowingUser(username) {
    cy.contains('.btn', `Unfollow ${username}`).should('be.visible');
  }

  assertUnfollowingUser(username) {
    cy.contains('.btn', `Follow ${username}`).should('be.visible');
  }

  assertUpdatingBio(bio) {
    cy.get('.user-info').should('contain', bio);
  }

  assertFollowUsername(username) {
    cy.get('.user-info').should('contain', username);
  }
}

export default UserPageObject;
