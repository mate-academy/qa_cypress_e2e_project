import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  clickFollowBtn() {
    cy.get('[data-qa="FollowBtn"').click();
  }

  assertFollowing() {
    cy.get('[data-qa="UnfollowBtn"').should('contain', 'Unfollow');
  }

  clickUnfollowBtn() {
    cy.get('[data-qa="UnfollowBtn"').click();
  }

  assertUnfollowing() {
    cy.get('[data-qa="FollowBtn"').should('contain', 'Follow');
  }
}
export default UserPageObject;
