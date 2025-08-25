import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/profile/';

  visit(username) { cy.visit(`${this.url}${username}`); }
  get followButton() { return this.getByQa('follow-btn'); }

  follow() { this.followButton.contains('Follow').click(); }
  unfollow() { this.followButton.contains('Unfollow').click(); }
  assertFollowed() { this.followButton.should('contain', 'Unfollow'); }
  assertUnfollowed() { this.followButton.should('contain', 'Follow'); }
}

export default UserPageObject;
