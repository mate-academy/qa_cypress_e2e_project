import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  assertHeaderIncludNewUsername(newUsername) {
    this.usernameLink
      .should('contain', newUsername);
  }

  get profileBio() {
    return cy.getByDataCy('bio');
  }

  assertBio(bio) {
    this.profileBio
      .should('contain', bio);
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollow() {
    this.followBtn.click();
  }

  assertFollow() {
    this.followBtn.should('contain', 'Unfollow');
  }

  login(email, username, password) {
    cy.login(email, username, password);
  }

  register(email, username, password) {
    cy.login(email, username, password);
  }
}

export default ProfilePageObject;
