import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followUserButton() {
    return cy.getByDataCy('follow-user-button');
  }

  get userInfo() {
    return cy.getByDataCy('user-info-page');
  }

  // clickFollowUserButton() {
  //   this.followUserButton
  //     .click();
  // }

  clickFollowUserButton() {
    cy.get('.action-btn').click();
  }

  // assertUserInfo (userName) {
  //   this.userInfo
  //     .should('contain', userName);
  // }

  assertUserInfo(username) {
    cy.get('.action-btn').should('contain', username);
  }

  // assertFollowUserButton() {
  //   this.followUserButton
  //     .should('be.visible');
  // }

  // assertFollowUser() {
  //   this.followUserButton
  //     .should('contain', 'Unfollow');
  // }

  assertFollowTheUser() {
    cy.get('.action-btn').should('contain', 'Unfollow');
  }
}

export default UserPageObject;
