import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get followBtn() {
    return cy.contains('.btn', 'Follow');
  }

  get unfollowBtn() {
    return cy.contains('.btn', 'Unfollow');
  }

  assertFollow() {
    this.unfollowBtn.should('exist');
  }

  assertUnFollow() {
    this.followBtn.should('exist');
  }

  visitProfile(username) {
    cy.visit(`#/@${username}`);
  }
}

export default UserPageObject;
