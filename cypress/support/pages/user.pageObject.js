import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#';

  visitUserPage(username) {
    cy.visit(`#/@${username}/`);
  }

  clickOnFollowBtn() {
    return cy.getByDataCy('followBtn').click();
  }

  clickOnUnFollowBtn() {
    return cy.getByDataCy('unFollowBtn').click();
  }

  assertSuccessfulFollowUser(username) {
    cy.getByDataCy('followBtn').should('be.visible')
      .and('contain', 'Follow').and('contain', username);
  }

  assertSuccessfulUnfollowUser(username) {
    cy.getByDataCy('unFollowBtn').should('be.visible')
      .and('contain', 'Unfollow').and('contain', username);
  }
}

export default UserPageObject;
