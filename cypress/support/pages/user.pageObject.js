import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';
  get usernameHeader() {
    return cy.get('h4');
  }

  assertPageContainUsername(username) {
    this.usernameHeader
      .should('contain', username);
  }

  get followBtn() {
    return cy.get('.btn-outline-secondary');
  }

  clickFollowBtn() {
    this.followBtn.click({ force: true });
  }

  assertFollowingBtnExist() {
    this.followBtn.should('exist');
  }

  get unfollowBtn() {
    return cy.get('.btn-secondary');
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertUnfollowingBtnExist() {
    this.unfollowBtn.should('exist');
  }
}

export default UserPageObject;