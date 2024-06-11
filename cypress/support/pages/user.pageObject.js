import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  clickFollowBtn() {
    cy.contains('.btn', 'Follow').click();
  }

  clickUnfollowBtn() {
    cy.contains('.btn', 'Unfollow').click();
  }

  assertFollowBtn() {
    cy.get('.btn').should('contain', 'Follow');
  }

  assertUnfollowBtn() {
    cy.get('.btn').should('contain', 'Unfollow');
  }
}

export default UserPageObject;
