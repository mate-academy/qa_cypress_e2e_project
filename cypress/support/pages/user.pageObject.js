import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = `/#/@Sasha`;

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
      .should('eq', 'http://localhost:1667/#/@Sasha');
  }
};

export default UserPageObject;
