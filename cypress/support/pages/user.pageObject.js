import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  //  url = `/#/${slug}`;

  get articleTitle() {
    return cy.get('preview-article-link');
  }

  get articleAuthor() {
    return cy.get('.author');
  }

  get followButton() {
    return cy.getByDataCy('profile-follow-btn');
  }

  articleAuthorClick() {
    this.articleAuthor.click();
  }

  followButtonClick() {
    this.followButton.click();
  }

  assertFollowButton() {
    this.followButton
      .should('contain', 'Follow');
  }

  assertUnfollowButton() {
    this.followButton
      .should('contain', 'Unfollow');
  }

  assertFollowingUser(username) {
    this.followButton
      .should('contain', 'Follow');
  }

  assertUnfollowingUser(username) {
    this.followButton
      .should('contain', 'Unfollow');
  }
};

export default UserPageObject;
