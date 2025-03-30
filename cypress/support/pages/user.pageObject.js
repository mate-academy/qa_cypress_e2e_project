class UserPageObject {
  get profilePicture() {
    return cy.getByDataQa('user-img');
  }

  get userName() {
    return cy.getByDataQa('user-name');
  }

  get userBio() {
    return cy.getByDataQa('user-bio');
  }

  assertUsernameIsChanged(username) {
    this.userName.should('contain', username);
  }

  assertBioIsChanged(bio) {
    this.userBio.should('contain', bio);
  }
}

export default UserPageObject;
