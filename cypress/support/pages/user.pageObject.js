import PageObject from '../PageObject';

class UserPageObject extends PageObject {

  get userName() {
    return cy.get('h4');
  }

  get followButton() {
    return cy.getByDataQa('follow-button');
  }

  clickFollowButton() {
    this.followButton.click();
  }

  assertUsername(secondUsername) {
    this.userName.should('contain.text', secondUsername);
  }

  assertFollowing() {
    this.followButton.should('contain.text', 'Unfollow');
  }

  visitUser(secondUsername) {
    cy.visit(`#/@${secondUsername}/`);
  }
}

export default UserPageObject;
