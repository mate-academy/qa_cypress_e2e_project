import PageObject from './PageObject';

class ProfilePageObject extends PageObject {
  get followButton() {
    return cy.getByDataQa('follow-button');
  }

  get unfollowButton() {
    return cy.getByDataQa('unfollow-button');
  }

  get userInfo() {
    return cy.getByDataQa('user-info');
  }

  get userArticles() {
    return cy.getByDataQa('user-articles');
  }

  get favoritedArticles() {
    return cy.getByDataQa('favorited-articles');
  }

  get userHeader() {
    return cy.getByDataQa('user-header');
  }

  get userBio() {
    return cy.getByDataQa('user-bio');
  }

  clickFollowButton() {
    this.followButton.click();
    return this;
  }

  clickUnfollowButton() {
    this.unfollowButton.click();
    return this;
  }

  visitUserProfile(username) {
    cy.visit(`/profile/${username}`);
    return this;
  }

  verifyUserInfoContains(text) {
    this.userInfo.should('contain', text);
    return this;
  }

  verifyUserHeaderContains(username) {
    this.userHeader.should('contain', username);
    return this;
  }
}

export default ProfilePageObject;
