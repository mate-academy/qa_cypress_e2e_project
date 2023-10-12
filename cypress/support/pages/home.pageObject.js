import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get userFollowBtn() {
    return cy.getByDataCy('follow');
  }

  get userUnfollowBtn() {
    return cy.getByDataCy('unfollow');
  }

  clickFollowBtn() {
    this.userFollowBtn.click();
  }

  clickUnfollowBtn() {
    this.userUnfollowBtn.click();
  }

  clickOnUsername() {
    this.usernameLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertLoginFailed() {
    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-modal').should('contain', 'Login failed');
  }

  checkLogOut(username) {
    this.usernameLink
      .should('not.exist', username);
  }

  assertFollowBtn() {
    this.userFollowBtn.should('exist');
  }

  assertUnfollowBtn() {
    this.userUnfollowBtn.should('exist');
  }
}

export default HomePageObject;
