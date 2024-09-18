import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get usernameField() {
    return cy.getByDataCy('username-profile');
  }

  get bioField() {
    return cy.getByDataCy('bio-profile');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-profile');
  }

  get followBtn() {
    return cy.getByDataCy('follow-profile');
  }

  get myArticlesLink() {
    return cy.getByDataCy('my-articles-profile');
  }

  get favoriteArticlesLink() {
    return cy.getByDataCy('favorites-articles-profile');
  }

  assertUsername(username) {
    this.usernameField
      .should('contain', username);
  }

  assertBio(bio) {
    this.bioField
      .should('contain', bio);
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickMyArticlesLink() {
    this.myArticlesLink.click();
  }

  clickFavoriteArticlesLink() {
    this.favoriteArticlesLink.click();
  }

  setUsername(username) {
    this.username = username;
  }
}

export default ProfilePageObject;
