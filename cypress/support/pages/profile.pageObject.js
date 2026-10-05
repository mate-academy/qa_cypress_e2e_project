import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get profileUsernameElement() {
    return cy.getByDataQa('profile-username');
  }

  get followUserElement() {
    return cy.getByDataQa('follow-user');
  }

  get unfollowUserElement() {
    return cy.getByDataQa('unfollow-user');
  }

  get profileBioElement() {
    return cy.getByDataQa('profile-bio');
  }

  visitUser(username) {
    this.visit(`/#/@${username}`);
    this.profileUsernameElement.should('have.text', username);
  }

  follow() {
    this.followUserElement.click();
    this.unfollowUserElement.should('be.visible');
  }

  unfollow() {
    this.unfollowUserElement.click();
    this.followUserElement.should('be.visible');
  }

  assertFollowing() {
    this.unfollowUserElement.should('be.visible');
    this.followUserElement.should('not.exist');
  }

  assertNotFollowing() {
    this.followUserElement.should('be.visible');
    this.unfollowUserElement.should('not.exist');
  }

  assertBio(bio) {
    this.profileBioElement.should('have.text', bio);
  }
}

export default ProfilePageObject;
