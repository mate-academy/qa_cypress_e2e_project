import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.get('[data-qa="Follow btn"]');
  }

  get unfollowBtn() {
    return cy.get('[data-qa="Unfollow btn"]');
  }

  visitPageUser(name) {
    cy.visit(`/#/@${name}`);
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertFollowBtn() {
    this.followBtn.should('contain', 'Follow');
  }

  assertUnfollowBtn() {
    this.unfollowBtn.should('contain', 'Unfollow');
  }
}

export default UserPageObject;
