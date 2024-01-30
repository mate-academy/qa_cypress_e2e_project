import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/@';

  get followButton() {
    return cy.getByDataQa('FollowButton');
  }

  clickFollowButton() {
    this.followButton.click();
  }

  assertFollowButton() {
    this.followButton.should('contain', 'Unfollow');
  }
}
export default UserPageObject;
