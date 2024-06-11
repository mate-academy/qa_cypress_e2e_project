import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visit(user) {
    cy.visit(`/#/@${user.username}/`);
  }

  clickFollowBtn() {
    cy.getByDataCy('follow-btn').click();
  }

  AssertFollowing(text) {
    cy.get('.btn').should('include.text', text);
  }

  clickUnFollowBtn() {
    cy.getByDataCy('unfollow-btn').click();
  }

  AssertUnFollowing(text) {
    cy.get('.btn').should('include.text', text);
  }
}

export default UserPageObject;
