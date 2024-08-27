import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  constructor(username) {
    super();

    this.url = `#/@${username}/`;
  }

  get profileUsername() {
    return cy.getByDataQa('username-profile');
  }

  get profileBio() {
    return cy.getByDataQa('bio-profile');
  }

  get followUserBtn() {
    return cy.getByDataQa('btn-follow-user');
  }

  get unfollowUserBtn() {
    return cy.getByDataQa('btn-unfollow-user');
  }

  assertUsernameExists(username) {
    this.profileUsername
      .should('exist')
      .and('be.visible')
      .and('contain.text', username);
  }

  assertUsernameUpdated(newUsername) {
    this.profileUsername
      .should('contain.text', newUsername);
  }

  assertUpdatedBioExists(bio) {
    this.profileBio
      .should('exist')
      .and('be.visible')
      .and('contain.text', bio);
  }

  assertFollowUserBtnExist(btnName) {
    this.followUserBtn
      .should('exist')
      .and('be.visible')
      .and('contain', btnName);
  }

  clickOnFollowUserBtn() {
    this.followUserBtn
      .click();
  }

  assertUnfollowUserBtnExist(btnName) {
    this.unfollowUserBtn
      .should('exist')
      .and('be.visible')
      .and('contain', btnName);
  }

  clickOnUnfollowUserBtn() {
    this.unfollowUserBtn
      .click();
  }
}

export default ProfilePageObject;
