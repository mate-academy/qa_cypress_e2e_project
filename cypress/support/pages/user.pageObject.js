import PageObject from '../PageObject';
class UserPageObject extends PageObject {
  url = `/#/@Elvira`;
  clickFollowBtn() {
    cy.contains('.btn', 'Follow')
      .click();
  }
  clickUnfollowBtn() {
    cy.contains('.btn', 'Unfollow')
      .click();
  }

  assertFollowBtn() {
    cy.get('.btn')
      .should('contain', 'Follow');
  }

  assertUnfollowBtn() {
    cy.get('.btn')
      .should('contain', 'Unfollow');
  }

  assertUser2PageUrl() {
    cy.url()
      .should('eq', 'http://localhost:1667/#/@Elvira');
  }
};
export default UserPageObject;