import PageObject from '../PageObject';

class UserProfilePageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  clickFollowBtn() {
    cy.getByDataQa('follow-user-btn')
      .click();
  }

  clickUnfollowBtn() {
    cy.getByDataQa('unfollow-user-btn')
      .click();
  }

  checkFollowing() {
    cy.getByDataQa('unfollow-user-btn')
      .should('exist')
  }

  checkUnfollowing() {
    cy.getByDataQa('follow-user-btn')
      .should('exist')
  }
}

export default UserProfilePageObject ;
