import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get followButton() {
    return cy.getByDataQa('follow-button');
  }

  get unFollowButton() {
    return cy.getByDataQa('unfollow-button');
  }

  clickFollowButton() {
    this.followButton.click();
  }

  clickUnFollowButton() {
    this.unFollowButton.click();
  }
}

export default ProfilePageObject;
