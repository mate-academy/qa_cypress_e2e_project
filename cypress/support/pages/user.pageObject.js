import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followUserBtn() {
    return cy.get('[data-qa="follow-user"]');
  }

  get unfollowUserBtn() {
    return cy.get('[data-qa="unfollow-user"]');
  }

  clickOnUnfollowBtn() {
    this.unfollowUserBtn.click();
  }

  clickOnFollowBtn() {
    this.followUserBtn.click();
  }

  visitUserPage(username) { 
    cy.visit(`/#/@${username}`); 
  }

  assertUnfollowedUser(username) {
    this.followUserBtn
      .should('contain',`Follow /#/@${username}` );
  }
}

export default UserPageObject;